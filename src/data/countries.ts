export type Country = {
  name: string;
  code: string;
  unlocked: boolean;
};

export const initialCountries: Country[] = [
  { name: "Bangladesh", code: "BD", unlocked: true },
  { name: "Japan", code: "JP", unlocked: false },
  { name: "Australia", code: "AU", unlocked: false },
  { name: "Sweden", code: "SE", unlocked: false },
  { name: "Spain", code: "ES", unlocked: false },
  { name: "England", code: "GB", unlocked: false },
]; 