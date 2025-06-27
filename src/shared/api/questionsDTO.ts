export interface DataItem {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface BaseDTO {
  page: number;
  limit: number;
  total: number;  
}
export interface SpecializationDTO extends DataItem {
  page: number;
  limit: number;
  data: DataItem[];
  total: number;  
}

export interface SkillDTO extends BaseDTO {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  createdAt?: string;
  updatedAt?: string;
  specializations: DataItem[];
  data?: DataItem[];
}

export interface QuestDTO {
  id: number;
  username: string;
}

export interface QuestionDTO {
  id: number;
  title: string;
  description: string;
  code: string;
  imageSrc?: string;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: 'public' | 'private';
  rate: number;
  complexity: number;
  createdById: string;
  updatedById: string;
  questionSpecializations: SpecializationDTO[];
  questionSkills: SkillDTO[];
  createdAt?: string;
  updatedAt?: string;
  createdBy: QuestDTO;
  updatedBy?: QuestDTO;
}

export interface QuestionsResponseDTO {
  page: number;
  limit: number;
  data: QuestionDTO[];
  total: number;
}