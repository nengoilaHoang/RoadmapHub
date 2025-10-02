export function stripHtmlAndCss(html) {
  // Xóa nội dung trong <style>...</style>
  let text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  // Xóa tất cả thẻ HTML còn lại
  text = text.replace(/<[^>]*>?/gm, '');
  return text.trim();
}

export function truncateWords(text, limit) {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
}