import type { Meta, StoryObj } from '@storybook/react';
import FilterMoviesCard from "../components/filterMoviesCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const meta = {
  title: 'Home Page/FilterMoviesCard',
  component: FilterMoviesCard,
  decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story: React.FC) => (<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
    )
  ],
} satisfies Meta<typeof FilterMoviesCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onFilterValuesChange: action("filter input"),
    titleFilter: "",
    genreFilter: "All",
    sortOrder: "asc", // or "desc" depending on your use case
    onSortOrderChange: action("sort order change"),
  },
};
Basic.storyName = "Default";