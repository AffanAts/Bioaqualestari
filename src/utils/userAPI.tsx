export interface User {
    id: string;
    username: string;
    password: string;
  }
  
  export interface AuthorizedUser {
    id: string;
    username: string;
  }
  
  export async function authorizeUser(credentials: { username: string; password: string } | undefined): Promise<AuthorizedUser | null> {
    if (!credentials) {
      return null;
    }
  
    const response = await fetch("https://bioaqualestari.hasura.app/api/rest/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "uWyWA0nJbI0pnUA1jfwXlOUpLA5BYba1tb3sDtmTZg8uwRrtWG0gDxTPMn011TuH",
      },
    });
  
    const data = await response.json();
  
    // Periksa apakah ada pengguna dengan kredensial yang sesuai
    const user = data.users.find((user: User) => user.username === credentials.username && user.password === credentials.password);
  
    if (user) {
      return {
        id: user.id,
        username: user.username,
      };
    } else {
      return null;
    }
  }
  