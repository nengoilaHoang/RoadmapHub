import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is required in environment variables");
    }

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // 🔥 UPDATED MODEL LIST - Oct 2024 
    // Try in order of preference (newest to oldest)
    this.modelsToTry = [
      "gemini-2.0-flash-001",    // Latest Dec 2024 with version
      "gemini-2.0-flash",        // Latest Dec 2024 stable
      "gemini-2.5-flash",        // Oct 2024 release
      "gemini-1.5-flash-002",    // Sept 2024 stable version
      "gemini-1.5-pro-002",      // Sept 2024 Pro version  
      "gemini-1.5-flash-001",    // Older version fallback
      "gemini-1.5-pro-001"       // Last resort
    ];

    this.workingModel = null;
    this.modelTestCache = new Map();
  }

  async findWorkingModel() {
    // Return cached working model if available
    if (this.workingModel) {
      return this.workingModel;
    }

    //console.log("🔍 Searching for available Gemini model...");

    for (const modelName of this.modelsToTry) {
      try {
        // Check cache first
        if (this.modelTestCache.has(modelName)) {
          const cached = this.modelTestCache.get(modelName);
          if (cached.works) {
            //console.log(`✅ Using cached working model: ${modelName}`);
            this.workingModel = modelName;
            return modelName;
          }
          continue; // Skip if cached as non-working
        }

        //console.log(`🧪 Testing model: ${modelName}`);

        const model = this.genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: 0.1, // Low temperature for test
            maxOutputTokens: 50 // Small output for test
          }
        });

        // Simple test with timeout
        const testPromise = model.generateContent("Hi");
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 5000)
        );

        await Promise.race([testPromise, timeoutPromise]);

        //console.log(`✅ Found working model: ${modelName}`);
        this.workingModel = modelName;
        this.modelTestCache.set(modelName, { works: true, tested: new Date() });
        return modelName;

      } catch (error) {
        //console.log(`❌ ${modelName} failed: ${error.message.substring(0, 100)}`);
        this.modelTestCache.set(modelName, { works: false, tested: new Date(), error: error.message });
        continue;
      }
    }

    // If no model works, try to fetch available models from API
    //console.log("🔍 No predefined models work, checking API for available models...");
    try {
      const availableModels = await this.fetchAvailableModels();
      if (availableModels.length > 0) {
        for (const modelInfo of availableModels) {
          if (modelInfo.supportedGenerationMethods?.includes('generateContent')) {
            //console.log(`🧪 Testing API-discovered model: ${modelInfo.name}`);
            try {
              const model = this.genAI.getGenerativeModel({ model: modelInfo.name });
              await model.generateContent("Hi");

              //console.log(`✅ API-discovered working model: ${modelInfo.name}`);
              this.workingModel = modelInfo.name;
              return modelInfo.name;
            } catch (error) {
              //console.log(`❌ ${modelInfo.name} failed: ${error.message.substring(0, 100)}`);
            }
          }
        }
      }
    } catch (error) {
      console.error("❌ Failed to fetch available models:", error.message);
    }

    throw new Error(`No working Gemini models found. Available models: ${this.modelsToTry.join(', ')}`);
  }

  async fetchAvailableModels() {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error("Error fetching available models:", error.message);
      return [];
    }
  }

  getNewRoadmap = async (req, res, next) => {
    try {
      const { text } = req.body;

      // Input validation
      if (!text) {
        return res.status(400).json({
          status: "fail",
          message: "Text field is required"
        });
      }

      if (typeof text !== 'string') {
        return res.status(400).json({
          status: "fail", 
          message: "Text must be a string"
        });
      }

      if (text.trim().length === 0) {
        return res.status(400).json({
          status: "fail",
          message: "Text cannot be empty"
        });
      }

      if (text.length > 10000) {
        return res.status(400).json({
          status: "fail",
          message: "Text is too long (max 10000 characters)"
        });
      }

      // Find and use working model
      const modelName = await this.findWorkingModel();

      const model = this.genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      });

      //console.log(`🤖 Generating content using model: ${modelName}`);
      //console.log(`📝 Input length: ${text.length} characters`);

      const result = await model.generateContent(text.trim());

      // Validate response
      if (!result || !result.response) {
        console.error("❌ No response object from Gemini API");
        throw new Error("No response received from Gemini API");
      }

      if (typeof result.response.text !== 'function') {
        console.error("❌ Response object missing text() method");
        throw new Error("Invalid response format from Gemini API");
      }

      const responseText = result.response.text();

      if (!responseText || responseText.trim().length === 0) {
        console.error("❌ Empty response text from Gemini API");
        throw new Error("Empty response from Gemini API");
      }

      //console.log(`✅ Success! Model: ${modelName}, Response length: ${responseText.length}`);

      return res.status(200).json({
        status: "success",
        response: responseText.trim(),
        model: modelName,
        timestamp: new Date().toISOString(),
        inputLength: text.length,
        responseLength: responseText.length
      });

    } catch (error) {
      console.error("🚨 Gemini Service Error:", {
        message: error.message,
        name: error.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });

      // Reset working model cache if it's a model-related error
      if (error.message?.includes("not found") || error.message?.includes("404")) {
        //console.log("🔄 Resetting model cache due to model error");
        this.workingModel = null;
        this.modelTestCache.clear();
      }

      // Categorize errors
      let statusCode = 500;
      let errorMessage = "Internal server error";
      let errorCode = "INTERNAL_ERROR";

      if (error.message?.includes("API key")) {
        statusCode = 401;
        errorMessage = "Invalid or missing API key";
        errorCode = "INVALID_API_KEY";
      } else if (error.message?.includes("404") || error.message?.includes("not found")) {
        statusCode = 404;
        errorMessage = "No available Gemini models found. Please contact support.";
        errorCode = "MODEL_NOT_AVAILABLE";
      } else if (error.message?.includes("400") || error.message?.includes("Bad Request")) {
        statusCode = 400;
        errorMessage = "Invalid request parameters";
        errorCode = "BAD_REQUEST";
      } else if (error.message?.includes("429") || error.message?.includes("quota")) {
        statusCode = 429;
        errorMessage = "Rate limit exceeded. Please try again later.";
        errorCode = "RATE_LIMIT_EXCEEDED";
      } else if (error.message?.includes("500") || error.message?.includes("Internal")) {
        statusCode = 500;
        errorMessage = "Gemini API temporarily unavailable";
        errorCode = "API_UNAVAILABLE";
      } else if (error.message?.includes("timeout") || error.message?.includes("Timeout")) {
        statusCode = 408;
        errorMessage = "Request timeout. Please try again.";
        errorCode = "REQUEST_TIMEOUT";
      } else if (error.message?.includes("No working Gemini models")) {
        statusCode = 503;
        errorMessage = "Gemini service temporarily unavailable";
        errorCode = "SERVICE_UNAVAILABLE";
      }

      return res.status(statusCode).json({
        status: "fail",
        message: errorMessage,
        errorCode: errorCode,
        timestamp: new Date().toISOString(),
        // Show debug info in development
        ...(process.env.NODE_ENV === 'development' && {
          debug: {
            originalError: error.message,
            attemptedModels: this.modelsToTry,
            workingModel: this.workingModel
          }
        })
      });
    }
  };

  // Optional: Method to manually test connection
  testConnection = async (req, res) => {
    try {
      const modelName = await this.findWorkingModel();
      const model = this.genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, this is a connection test.");

      return res.status(200).json({
        status: "success",
        message: "Gemini API connection successful",
        model: modelName,
        testResponse: result.response.text(),
        availableModels: this.modelsToTry,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "Gemini API connection failed",
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Optional: Method to clear model cache
  clearModelCache = () => {
    this.workingModel = null;
    this.modelTestCache.clear();
    //console.log("🔄 Model cache cleared");
  };
}

export default new GeminiService();