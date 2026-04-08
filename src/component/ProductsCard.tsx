interface ProductsCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductsCard: React.FC<ProductsCardProps> = ({ name, price, description, image }) => {
  return (
    <div>
        <img src={image} alt=""/>
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>{description}</p>
    </div>
  );
};

export default ProductsCard;