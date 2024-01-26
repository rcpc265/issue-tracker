import Image from "next/image";

interface Props {
  src?: string;
}
const UserAvatar = ({ src }: Props) => {
  return src ? (
    <Image
      className="rounded-full cursor-pointer"
      src={src}
      width={32}
      height={32}
      alt="User avatar"
    />
  ) : (
    <div className="rounded-full cursor-pointer bg-green-600 text-white text-lg flex items-center justify-center w-9 h-9 font-medium">
      ?
    </div>
  );
};
export default UserAvatar;
