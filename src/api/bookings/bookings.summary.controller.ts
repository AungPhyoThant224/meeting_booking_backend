import { Request, Response } from "express";
import * as summaryService from "./bookings.summary.service.js";

export const getSummary = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const data = await summaryService.getDashboardData(
      startDate as string, 
      endDate as string
    );
    
    res.json({
        message: "Summary data retrieved successfully",
        data: data
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
