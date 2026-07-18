export interface WeeklyReport {

    studyHours:number;

    previousHours:number;

    improvement:number;

}

export interface Performance {

    strongest:{

        name:string;

        score:number;

    };

    weakest:{

        name:string;

        score:number;

    };

}

export interface Coach {
  title: string;
  message: string;
  recommendation: string;
}

export interface IntelligenceResponse {
  weeklyReport: WeeklyReport;
  performance: Performance;
  consistency: string;
  coach: Coach;
}