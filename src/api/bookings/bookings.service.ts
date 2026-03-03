import {prisma} from '../../prisma/prismaClient.js';

export const createBooking = async (userId: string, startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      AND: [
        { startTime: { lt: end } },
        { endTime: { gt: start } }
      ]
    }
  });

  if (overlappingBooking) {
    throw new Error("This time slot overlaps with an existing booking.");
  }

  return await prisma.booking.create({
    data: {
      userId,
      startTime: start,
      endTime: end
    },
    include: { user: { select: { name: true } } }
  });
};

export const updateBooking = async (
  bookingId: string, 
  userId: string, 
  role: string, 
  data: { startTime?: string; endTime?: string }
) => {
  const currentBooking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!currentBooking) throw new Error("Booking not found");

  if (role === 'USER' && currentBooking.userId !== userId) {
    throw new Error("You do not have permission to update this booking");
  }

  const start = data.startTime ? new Date(data.startTime) : currentBooking.startTime;
  const end = data.endTime ? new Date(data.endTime) : currentBooking.endTime;

  const overlap = await prisma.booking.findFirst({
    where: {
      id: { not: bookingId },
      AND: [
        { startTime: { lt: end } },
        { endTime: { gt: start } }
      ]
    }
  });

  if (overlap) throw new Error("New time slot overlaps with an existing booking");

  return await prisma.booking.update({
    where: { id: bookingId },
    data: { startTime: start, endTime: end },
    include: { user: { select: { name: true } } }
  });
};

export const getAllBookings = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [bookings, total] = await prisma.$transaction([
    prisma.booking.findMany({
      skip,
      take: limit,
      include: { user: { select: { id: true, name: true, role: true } } },
      orderBy: { startTime: 'asc' }
    }),
    prisma.booking.count(),
  ]);

  return {
    bookings,
    meta: { total, page, lastPage: Math.ceil(total / limit) }
  };
};

export const deleteBooking = async (bookingId: string, userId: string, role: string) => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  if (!booking) throw new Error("Booking not found");

  if (role === 'USER' && booking.userId !== userId) {
    throw new Error("You do not have permission to delete this booking");
  }

  return await prisma.booking.delete({ where: { id: bookingId } });
};