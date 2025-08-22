interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}[]


interface SermonProps {
  id: string,
  title: string,
  message: string,
  sermonId: string
}

interface User {
  degree: string;
  programme: string;
  department: string;
  retake: string;
  rank: string;
  name: string;
  email: string;
  reg_no: string;
  id: string;
}


interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up" | "generate";

interface BlobProps{
  data: Blob | MediaSource
  type: {}
}

interface MonitorDataProps{
  userId: string
  interviewId: string
  mediaUrl: string
}

