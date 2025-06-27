import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './config';
import type { SpecializationDTO, QuestionsResponseDTO, SkillDTO } from './questionsDTO';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery( { baseUrl: baseUrl}),
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionsResponseDTO, {
      page: number;
      skills: number[];
      rate: number[];
      keywords: string[];
      specialization: number | null;
      complexity: number[];
    }>({
      query: (params) => {
    const { page, skills, rate, keywords, specialization, complexity } = params;
    const queryParams = new URLSearchParams();
    
    queryParams.append('page', page.toString());
    queryParams.append('limit', '10');
    
    if (skills?.length) {
      queryParams.append('skills', skills.join(','));
    }
    
    if (keywords?.length) {
      queryParams.append('keywords', keywords.join(','));
    }
    
    if (specialization !== null) {
      queryParams.append('specialization', specialization.toString());
    }
    if (rate.length) {
      queryParams.append('rate', rate.toString());
    }
    
    if (complexity.length) {
      queryParams.append('complexity', complexity.toString());
    }
    
    return `/questions/public-questions?${queryParams.toString()}`;
  }
    }),
    getQuestion: builder.query({
      query: ({ id }) => `/questions/public-questions/${id}`
    }),
    getSkills: builder.query<SkillDTO, { page: number, id: number }>({
      query: ({ id }) => `/skills?page=1&limit=15&specialization=${id}`,
    }),
    getSpecializations: builder.query<SpecializationDTO, {page: number}>({
      query: () => `/specializations?page=1&limit=10`
    }),
  }),
});

export const { 
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} = baseApi;