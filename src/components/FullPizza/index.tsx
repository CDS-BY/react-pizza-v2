import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./FullPizza.module.scss";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://647323b9d784bccb4a3c4b0d.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении данных");
        navigate("/");
      }
    }

    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) {
    return <>"Загрузка..."</>;
  }

  return (
    <div className={styles.root}>
      <img className={styles.image} src={pizza.imageUrl} alt="pizza" />
      <div className={styles.description}>
        <h2 className={styles.title}>{pizza.title}</h2>
        <h4 className={styles.price}>{pizza.price} руб.</h4>
      </div>
      <Link className={styles.link} to="/">
        На главную
      </Link>
    </div>
  );
};

export default FullPizza;
