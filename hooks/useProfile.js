import { useRouter } from "next/navigation";

export const useProfileActions = (posts, setPosts) => {
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=/${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Oh no! What didn't you like about this prompt? ...Are you sure?",
    );
    if (hasConfirmed) {
      const id = post._id.toString();
      try {
        await fetch(`/api/prompt/${id}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Pheww... Now people will continue to benefit from it.");
    }
  };

  return { handleEdit, handleDelete };
};
