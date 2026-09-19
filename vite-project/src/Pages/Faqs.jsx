import React, { useState } from "react";
import "./FAQs.css";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Plantora?",
      answer:
        "Plantora is an indoor plant platform where you can discover, shop for plants, find plants suited to your space, and learn how to care for them.",
    },
    {
      question: "How does the Plant Finder work?",
      answer:
        "Plant Finder asks you a few questions about your room, sunlight, watering habits, preferred plant size, and experience. Based on your answers, it provides plant recommendations suited to your preferences.",
    },
    {
      question: "How do I choose the right plant for my home?",
      answer:
        "Consider factors such as available sunlight, room temperature, space, watering routine, and the amount of care you can provide. You can also use Plantora's Plant Finder for personalized recommendations.",
    },
    {
      question: "How often should I water my indoor plants?",
      answer:
        "Watering frequency depends on the plant type, sunlight, temperature, humidity, and soil condition. Always check the soil before watering rather than following a fixed schedule.",
    },
    {
      question: "Can I add plants to my wishlist?",
      answer:
        "Yes. You can add plants you like to your wishlist and easily find them again later.",
    },
    {
      question: "Can I track my plants and their care?",
      answer:
        "Yes. Plantora's plant-care features are designed to help you keep track of your plants and their care requirements.",
    },
    {
      question: "Can I return a plant after purchasing it?",
      answer:
        "Returns and replacements depend on the applicable Plantora return policy and the condition of the product. Please check the return and refund policy before placing an order.",
    },
    {
      question: "What should I do if my plant arrives damaged?",
      answer:
        "If your plant arrives damaged or you receive an incorrect product, contact Plantora's customer support as soon as possible and provide the required order details and photographs.",
    },
    {
      question: "Do I need an account to browse plants?",
      answer:
        "You can browse Plantora's available plants and information without an account. An account may be required for features such as orders, wishlist, and personalized plant-care features.",
    },
    {
      question: "How can I contact Plantora?",
      answer:
        "You can contact Plantora through the contact information provided on our website. For order-related questions, keep your order details available so our support team can assist you.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <span>PLANTORA</span>
          <h1>Frequently Asked Questions</h1>
          <p>
            Everything you need to know about Plantora, plants, shopping, and
            plant care.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${openIndex === index ? "active" : ""}`}
              key={index}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>

                <span className="faq-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
