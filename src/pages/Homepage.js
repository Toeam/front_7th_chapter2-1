import { PageLayout } from "./PageLayout";
import { SearchForm, ProductList } from "../components/index.js";

export const Homepage = ({
  filters,
  products,
  pagination,
  loading,
  categories,
  selectedCategory1,
  selectedCategory2,
}) => {
  return PageLayout({
    children: `
  ${SearchForm({ filters, pagination, loading, categories, selectedCategory1, selectedCategory2 })}
  ${ProductList({ loading, products, pagination })}
  `,
  });
};
