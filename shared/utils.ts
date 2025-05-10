import { ZodSchema, z } from "zod";
import { fromZodError } from "zod-validation-error";

export function zodValidator<T>(schema: ZodSchema<T>, data: unknown): { success: boolean; errors?: string; data?: T } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      return { success: false, errors: validationError.message };
    }
    
    return { success: false, errors: "Validation failed" };
  }
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return 'N/A';
  
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    // Common statuses
    'active': 'success',
    'inactive': 'muted',
    'suspended': 'destructive',
    'pending': 'warning',
    
    // Alert severities
    'high': 'destructive',
    'medium': 'warning',
    'low': 'muted',
    
    // Transaction statuses
    'completed': 'success',
    'failed': 'destructive',
    'processing': 'warning',
    
    // System status
    'operational': 'success',
    'degraded': 'warning',
    'down': 'destructive',
    
    // War mode levels
    'level1': 'warning',
    'level2': 'destructive',
    'level3': 'destructive',
    
    // Default
    'default': 'muted'
  };
  
  return statusMap[status.toLowerCase()] || statusMap.default;
}

export function truncateText(text: string, maxLength: number = 30): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function generateAlphaNumericId(prefix: string, length: number = 6): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return `${prefix}-${result}`;
}
