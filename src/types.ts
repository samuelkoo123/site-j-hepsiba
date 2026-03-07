export type Inquiry = {
  id: number;
  name: string;
  contact: string;
  message: string;
  created_at: string;
};

export type Resource = {
  id: number;
  title: string;
  category: string;
  description: string;
  file_url: string;
  created_at: string;
};

export type Schedule = {
  id: number;
  title: string;
  type: 'personal' | 'official';
  date: string;
  description: string;
  created_at: string;
};

export type ResourceCategory = '설교 자료' | '찬양 자료' | '선교 자료' | '교육 자료' | '교회 행정 자료';
