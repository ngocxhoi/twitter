import { jwtDecode } from "jwt-decode";
import type { Credential, UserFetch } from "~/server/types/interface";

export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_loading", () => true);

  const setToken = (newToken?: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken ?? null;
  };

  const setUser = (newUser?: UserFetch) => {
    const authUser = useAuthUser();
    authUser.value = newUser ?? null;
  };

  const setIsAuthLoading = (value: boolean) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
  };

  const login = (credential: Partial<Credential>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: credential,
        });

        setToken(data.access_token);
        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const register = async (credential: Credential) => {
    try {
      const data = await $fetch("/api/auth/register", {
        method: "POST",
        body: credential,
      });

      setToken(data.access_token);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = await $fetch("/api/auth/refresh");

        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = await $fetch("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${useAuthToken().value}`,
          },
        });

        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value) {
      return;
    }

    const jwt: any = jwtDecode(authToken.value.toString());

    const newRefreshTime = jwt.exp - Date.now();

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true);
      try {
        await refreshToken();
        await getUser();

        // reRefreshAccessToken();

        resolve(true);
      } catch (error) {
        console.log(error);
        reject(error);
      } finally {
        setIsAuthLoading(false);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let tweet = await $fetch("/api/auth/logout", {
          method: "POST",
        });
        setToken();
        setUser();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    login,
    logout,
    register,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
    getUser,
  };
};
