import { prisma } from "../../prisma/prismaClient.js";

export const getDashboardData = async (
  startDate?: string,
  endDate?: string,
) => {
  const dateFilter =
    startDate && endDate
      ? {
          startTime: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }
      : {};

  const usageSummary = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { bookings: { where: dateFilter } },
      },
    },
  });

  const groupedBookings = await prisma.user.findMany({
    where: {
      bookings: { some: dateFilter },
    },
    select: {
      id: true,
      name: true,
      bookings: {
        where: dateFilter,
        orderBy: { startTime: "asc" },
        select: {
          id: true,
          startTime: true,
          endTime: true,
        },
      },
    },
  });

  return { usageSummary, groupedBookings };
};
