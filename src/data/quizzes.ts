export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number; // index of the correct option
};

export const quizzes: Record<string, QuizQuestion[]> = {
  BD: [
    {
      question: "What is the most common antibiotic used in Bangladesh?",
      options: ["Amoxicillin", "Ciprofloxacin", "Azithromycin", "Penicillin"],
      answer: 0,
    },
    {
      question: "Which disease is most prevalent in Bangladesh?",
      options: ["Malaria", "Dengue", "Tuberculosis", "HIV"],
      answer: 2,
    },
    {
      question: "What is the national vaccination program called?",
      options: ["EPI", "NIP", "VIP", "HPI"],
      answer: 0,
    },
  ],
  JP: [
    {
      question: "Which medicine is commonly used for seasonal allergies in Japan?",
      options: ["Cetirizine", "Ibuprofen", "Paracetamol", "Aspirin"],
      answer: 0,
    },
    {
      question: "What is a major public health concern in Japan?",
      options: ["Obesity", "Aging population", "Malaria", "Dengue"],
      answer: 1,
    },
    {
      question: "Which vaccine is part of Japan's routine immunization?",
      options: ["BCG", "HPV", "Rabies", "Yellow Fever"],
      answer: 1,
    },
  ],
  AU: [
    {
      question: "Which animal is a common carrier of the Hendra virus in Australia?",
      options: ["Kangaroo", "Fruit bat", "Koala", "Emu"],
      answer: 1,
    },
    {
      question: "What is the national immunization program called in Australia?",
      options: ["AIP", "NIP", "VIP", "AussieVax"],
      answer: 1,
    },
    {
      question: "Which disease is nearly eradicated in Australia?",
      options: ["Polio", "Malaria", "Dengue", "Tuberculosis"],
      answer: 0,
    },
  ],
  SE: [
    {
      question: "Which vitamin is commonly supplemented in Sweden due to long winters?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin D", "Vitamin C"],
      answer: 2,
    },
    {
      question: "What is the Swedish healthcare system known for?",
      options: ["Universal coverage", "Private insurance", "No hospitals", "No vaccinations"],
      answer: 0,
    },
    {
      question: "Which disease is rare in Sweden?",
      options: ["Diabetes", "Tuberculosis", "Flu", "Asthma"],
      answer: 1,
    },
  ],
  ES: [
    {
      question: "Which Mediterranean diet component is common in Spain?",
      options: ["Olive oil", "Butter", "Coconut oil", "Lard"],
      answer: 0,
    },
    {
      question: "What is a major public health concern in Spain?",
      options: ["Obesity", "Malaria", "Yellow fever", "Rabies"],
      answer: 0,
    },
    {
      question: "Which vaccine is mandatory for children in Spain?",
      options: ["HPV", "BCG", "MMR", "Rabies"],
      answer: 2,
    },
  ],
  GB: [
    {
      question: "What is the name of the UK's public health system?",
      options: ["NHS", "CDC", "WHO", "Red Cross"],
      answer: 0,
    },
    {
      question: "Which disease was eradicated in the UK by vaccination?",
      options: ["Smallpox", "Polio", "Measles", "Malaria"],
      answer: 0,
    },
    {
      question: "Which medicine is commonly prescribed for pain in the UK?",
      options: ["Paracetamol", "Ibuprofen", "Aspirin", "Codeine"],
      answer: 0,
    },
  ],
}; 