import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface EligibilityAssessment {
  eligible: boolean;
  confidence: number;
  reasons: string[];
  recommendations: string[];
  requiredDocuments: string[];
  nextSteps: string[];
  programSuggestions: string[];
}

export interface NIDVerification {
  valid: boolean;
  name: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
  photo: string;
  confidence: number;
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  async verifyNID(nidNumber: string): Promise<NIDVerification> {
    try {
      const prompt = `
        Verify this Bangladesh NID number: ${nidNumber}
        
        Return a JSON response with:
        {
          "valid": boolean,
          "name": "Full Name in Bengali and English",
          "fatherName": "Father's Name",
          "motherName": "Mother's Name", 
          "dateOfBirth": "YYYY-MM-DD",
          "address": "Full Address in Bengali",
          "photo": "Base64 encoded photo or placeholder",
          "confidence": 0.95
        }
        
        For demo purposes, return realistic Bangladeshi data if NID is 13 digits.
        If invalid format, return valid: false.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback for demo
      return {
        valid: nidNumber.length === 13,
        name: "রহিমা খাতুন / Rahima Khatun",
        fatherName: "আব্দুল হামিদ / Abdul Hamid",
        motherName: "ফাতেমা বেগম / Fatema Begum",
        dateOfBirth: "1985-03-15",
        address: "বাড়ি নং ১২, রোড নং ৮, ধানমন্ডি, ঢাকা-১২০৫",
        photo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjOUI5QkE1Ii8+CjxwYXRoIGQ9Ik0yMCA4MEw4MCA4MEw3MCAxMjBIMzBaIiBmaWxsPSIjOUI5QkE1Ii8+Cjwvc3ZnPgo=",
        confidence: 0.92
      };
    } catch (error) {
      console.error('NID verification error:', error);
      return {
        valid: false,
        name: "",
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        address: "",
        photo: "",
        confidence: 0
      };
    }
  }

  async assessEligibility(
    nidData: NIDVerification,
    programType: string,
    additionalInfo: any
  ): Promise<EligibilityAssessment> {
    try {
      const prompt = `
        Assess eligibility for ${programType} program based on:
        
        NID Data:
        - Name: ${nidData.name}
        - Father: ${nidData.fatherName}
        - Mother: ${nidData.motherName}
        - DOB: ${nidData.dateOfBirth}
        - Address: ${nidData.address}
        
        Additional Info:
        - Family Size: ${additionalInfo.familySize || 'Not provided'}
        - Monthly Income: ${additionalInfo.monthlyIncome || 'Not provided'}
        - Education Level: ${additionalInfo.educationLevel || 'Not provided'}
        - Employment Status: ${additionalInfo.employmentStatus || 'Not provided'}
        - Special Circumstances: ${additionalInfo.specialCircumstances || 'None'}
        
        Return JSON response:
        {
          "eligible": boolean,
          "confidence": 0.85,
          "reasons": ["Reason 1", "Reason 2"],
          "recommendations": ["Recommendation 1", "Recommendation 2"],
          "requiredDocuments": ["Document 1", "Document 2"],
          "nextSteps": ["Step 1", "Step 2"],
          "programSuggestions": ["Program 1", "Program 2"]
        }
        
        Consider Bangladesh social safety net criteria:
        - Income thresholds
        - Family size
        - Geographic location
        - Special needs
        - Previous benefit history
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback for demo
      return {
        eligible: true,
        confidence: 0.88,
        reasons: [
          "Meets income criteria for social safety net programs",
          "Family size qualifies for additional benefits",
          "Resides in eligible geographic area"
        ],
        recommendations: [
          "Submit income certificate from local authority",
          "Provide family member NID copies",
          "Complete household survey form"
        ],
        requiredDocuments: [
          "NID Copy (Original + Photocopy)",
          "Income Certificate",
          "Family Member NID Copies",
          "Bank Account Details",
          "Recent Photograph"
        ],
        nextSteps: [
          "Visit local Union Parishad office",
          "Submit required documents",
          "Complete biometric verification",
          "Wait for approval notification"
        ],
        programSuggestions: [
          "Clean Water Access Program",
          "Healthcare Subsidy",
          "Education Support",
          "Food Security Program"
        ]
      };
    } catch (error) {
      console.error('Eligibility assessment error:', error);
      return {
        eligible: false,
        confidence: 0,
        reasons: ["Unable to process eligibility assessment"],
        recommendations: ["Please try again or contact support"],
        requiredDocuments: [],
        nextSteps: [],
        programSuggestions: []
      };
    }
  }

  async generateEligibilityReport(
    assessment: EligibilityAssessment,
    nidData: NIDVerification
  ): Promise<string> {
    try {
      const prompt = `
        Generate a comprehensive eligibility report in Bengali and English:
        
        Assessment: ${JSON.stringify(assessment)}
        NID Data: ${JSON.stringify(nidData)}
        
        Include:
        1. Executive Summary
        2. Eligibility Status
        3. Detailed Analysis
        4. Required Actions
        5. Timeline
        6. Contact Information
        
        Format as professional government document.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Report generation error:', error);
      return "Unable to generate report. Please try again.";
    }
  }

  async generateChatResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Chat response error:', error);
      return "Sorry, I encountered an error. Please try again.\n\nদুঃখিত, একটি ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
    }
  }
}

export const geminiService = new GeminiService();
