// app/lib/auth.js
import jwt from 'jsonwebtoken';

interface LoginState {
    id: string;
    email: string;
    phone: string;
    profile: string;
}
export interface AuthUserPayload extends LoginState{
    iat: number,
    exp: number
}
  
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const activeTokens = new Set<string>(); // 활성 토큰 저장소

export const generateToken = ({id, email, phone, profile}:LoginState) => 
{
    const token = jwt.sign({ id, email, phone, profile }, JWT_SECRET, { expiresIn: '24h' });
    activeTokens.add(token);
    return token;
};

//@ts-ignore
export const verifyToken = (req, res, next) => 
{
    const token = req.cookies.token;

    if (!token) 
    {
        return res.json({ message: '인증이 필요합니다.' });
    }

    if (!activeTokens.has(token)) 
    {
        return res.json({ message: '유효하지 않은 토큰입니다.' });
    }

    try 
    {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch (error) 
    {
        activeTokens.delete(token);
        res.clearCookie('token');
        return res.json({ message: '유효하지 않은 토큰입니다.' });
    }
};

//@ts-ignore
export const removeToken = (token) => 
{
    activeTokens.delete(token);
};

export const isUserLoggedIn = (userId: string) => 
{
    for (const token of activeTokens) 
    {
        try 
        {
            const decoded:any = jwt.verify(token, JWT_SECRET);
            if (decoded.userId === userId) 
            {
                return true;
            }
        } 
        catch (error) 
        {
            activeTokens.delete(token);
        }
    }
    return false;
}; 

export function getCookieValue(cookieHeader: string | null, name: string) {
    if (!cookieHeader) return null;
    const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => c.trim().split("="))
    );
    return decodeURIComponent(cookies[name]);
}

export const getUserFromRequest = (req: Request) => {
    const cookieHeader = req.headers.get("cookie");
  const token = getCookieValue(cookieHeader, "token");
  if (!token) {
    return null
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      return null
    }
    return decoded as unknown as AuthUserPayload
  } catch (err) {
    return null
  }
}