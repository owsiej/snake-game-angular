export interface Alert {
  message: string | [];
  statusCode?: number;
  error?: string;
  hasTokenExpired?: boolean;
  type: 'window' | 'text';
  status: 'success' | 'info' | 'error';
}
