interface userCardProps {
  name: string;
  jabatan: string;
  email: string;
  foto: string;
}

const UserCard: React.FC<userCardProps> = ({ name, jabatan, email, foto }) => {
  return (
    <div>
      <img src={foto} alt="" />
      <h3>{name}</h3>
      <p>Age: {jabatan}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserCard;