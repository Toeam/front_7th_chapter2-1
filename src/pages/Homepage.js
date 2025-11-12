import { PageLayout } from "./PageLayout";
import { SearchForm, ProductList } from "../components/index.js";

export const Homepage = ({ filters, products, pagination, loading, categories }) => {
  return PageLayout({
    children: `
  ${SearchForm({ filters, pagination, loading, categories })}
  ${ProductList({ loading, products, pagination })}
  `,
  });
};
