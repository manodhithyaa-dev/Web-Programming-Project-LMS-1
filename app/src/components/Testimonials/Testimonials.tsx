import { testimonials } from "../../utils/data"

const Testimonials = () => {
  return (
    <div style={{ margin: "0 5rem", marginBottom: "1rem" }}>
      <h2 className="mb-4">Why people choose our platform</h2>

      <div className="row g-4">
        {testimonials.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-6">
            <div className="card h-100 shadow-sm p-3">
              
              {/* HEADER */}
              <div className="d-flex align-items-center mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "12px",
                  }}
                />
                <h6 className="mb-0 fw-semibold">{item.name}</h6>
              </div>

              {/* TEXT */}
              <p className="text-muted" style={{ fontSize: "14px" }}>
                "{item.text}"
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;