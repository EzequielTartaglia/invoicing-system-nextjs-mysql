import axios from "axios";
import Button from "@/components/Button";

async function loadUsers() {
    const { data } = await axios.get("http://localhost:3000/api/users");
    console.log(data);
    return data;
  }

export default async function LoginPage() {
 
    const users = await loadUsers();

    // Filter non banned users 
    const validNonBannedUsers = users.filter((user) => user.user_id !== undefined && user.user_is_banned !== 1);

    if (validNonBannedUsers.length === 0) {
        return (
          <div className="h-5/6 grid place-items-center">
            <div className="overflow-x-auto mt-[70px]">
              <h1 className="mb-4 text-center">No se encuentran usuarios registrados en la base de datos.</h1>
            </div>
            <div className="items-center mt-[50px]">
              <Button href="/singin" text="Registrar usuario" />
            </div>
          </div>
        );
      }
      
    return (
    <div>LoginPage</div>
  )
}
