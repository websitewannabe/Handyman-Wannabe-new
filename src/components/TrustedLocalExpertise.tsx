
import { motion } from "framer-motion";

const TrustedLocalExpertise = () => {
  return (
    <section className="py-16 bg-[#f05a27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Trusted Local Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "5+ Years Experience",
              description: "Serving Colorado Springs since 2018",
            },
            {
              title: "Local Knowledge",
              description: "Deep understanding of local home needs",
            },
            {
              title: "Over 300 Services",
              description: "One call for all your home improvement needs.",
            },
            {
              title: "★ ★ ★ ★ ★",
              description: "Consistently top-rated by customers",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/90 text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedLocalExpertise;
