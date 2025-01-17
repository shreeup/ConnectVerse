import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FriendSearch } from "..";
import { Friend } from "../../common";
import ActiveNow from "./ActiveNow";
import FriendCard from "./FriendCard";
import TopBar from "./TopBar";

const FriendsPrimaryColumn = () => {
  // const { friends } = useFriends();
  const navigate = useNavigate();
  const [friends, setFriends] = useState<Friend[]>([]);

  const fetchFriends = async () => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/friends/fetchFriends",
        { withCredentials: true }
      );

      console.log(data);
      setFriends(data.friends);
    } catch (error) {
      console.log(error);

      if (error.response.data.error === "No token!") {
        window.alert("you have to login again");
        toast.error("you have to login again");
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <section
      aria-labelledby="primary-heading"
      className="flex relative h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last bg-onyx"
    >
      <div className="w-full text-white py-4 px-4 h-16 border-b-raisin-black border-b-2 items-center flex justify-between">
        <TopBar />
      </div>
      <div className="flex flex-row h-full">
        <div className="w-full px-8 py-4 text-french-gray overflow-y-auto max-h-[calc(100vh_-_64px)]">
          <FriendSearch />
          <div className="font-medium text-sm my-3">ONLINE - 5</div>
          {friends?.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
        <ActiveNow />
      </div>
    </section>
  );
};

export default FriendsPrimaryColumn;
