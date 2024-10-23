import { useState, useEffect } from "react";
import { pool } from "@/config/database";

const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Query the database directly
          const result = await pool.query(
            "SELECT user_id FROM tokens WHERE token = $1",
            [token],
          );

          if (result.rows.length > 0) {
            setSession({ userId: result.rows[0].user_id, token });
          } else {
            // If the token is not found, clear it from localStorage
            localStorage.removeItem("token");
            setSession(null);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          setSession(null);
        }
      } else {
        setSession(null);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  return { session, loading };
};

export default useSession;
