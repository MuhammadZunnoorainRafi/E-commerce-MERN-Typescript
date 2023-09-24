import jwt from 'jsonwebtoken';

export const genToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '10 days',
  });
};
