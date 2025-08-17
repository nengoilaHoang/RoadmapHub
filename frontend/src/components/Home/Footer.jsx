export default function Footer(){
    return (
       <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="d-flex justify-content-center mt-5">
                    <div className="me-4"><a className="text-secondary text-decoration-none fs-4 fw-semibold"href="#">Roadmaps</a></div>
                    <div className="me-4"><a className="text-secondary text-decoration-none fs-4 fw-semibold"href="#">Best Practices</a></div>
                    <div className="me-4"><a className="text-secondary text-decoration-none fs-4 fw-semibold"href="#">Guides</a></div>
                    <div className="me-4"><a className="text-secondary text-decoration-none fs-4 fw-semibold"href="#">Videos </a></div>
                    <div className="me-4"><a className="text-secondary text-decoration-none fs-4 fw-semibold"href="#">FAQs</a></div>
                    <div><a className="text-secondary text-decoration-none fs-4 fw-semibold" href="#">YouTube</a></div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <p className="fs-4 text-secondary mb-1">
                            Community created roadmaps, best practices, projects, articles, resources and journeys to help you choose your path and grow in your career.
                        </p>
                        <ul className="d-flex gap-4 list-unstyled">
                            <li ><a href="/about" className="text-secondary text-decoration-none fs-5">© roadmap.sh</a></li>
                            <li><a href="/contact" className="text-secondary text-decoration-none fs-5">Contact Us</a></li>
                            <li><a href="/privacy" className="text-secondary text-decoration-none fs-5">Privacy</a></li>
                            <li><a href="/terms" className="text-secondary text-decoration-none fs-5">Terms</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0">© {new Date().getFullYear()} RoadmapHub. All rights reserved.</p>
                    </div>

                </div>
                {/* <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5 className="mb-3">RoadmapHub</h5>
                        <p className="text-muted">
                            Your ultimate destination for learning paths and career development roadmaps.
                        </p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-muted text-decoration-none">Home</a></li>
                            <li><a href="/about" className="text-muted text-decoration-none">About</a></li>
                            <li><a href="/contact" className="text-muted text-decoration-none">Contact</a></li>
                            <li><a href="/dashboard" className="text-muted text-decoration-none">Dashboard</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5 className="mb-3">Connect With Us</h5>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-muted fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-muted fs-5"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-muted fs-5"><i className="bi bi-linkedin"></i></a>
                            <a href="#" className="text-muted fs-5"><i className="bi bi-github"></i></a>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="text-muted text-white mb-0">
                            © {new Date().getFullYear()} RoadmapHub. All rights reserved.
                        </p>
                    </div>
                </div> */}
            </div>
        </footer>
    );
}