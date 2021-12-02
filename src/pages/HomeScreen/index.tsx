// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactToolTip from "react-tooltip";
import {
  Container,
  CategoryArea,
  CategoryList,
  ProductArea,
  ProductList,
  ProductPaginationArea,
  ProductPaginationItem,
} from "./styled";

import Header from "../../components/Header";
import CategoryItem from "../../components/CategoryItem";
import ProductItem from "../../components/ProductItem";
import Modal from "../../components/Modal";
import ModalContent from "../../components/ModalContent";
import api from "../../api";

let searchTimer: ReturnType<typeof setTimeout>;

const HomeScreen = () => {
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchedItem, setSearchedItem] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const res = await api.getCategories();
      if (res.error === "") {
        setCategories(res.result);
      }
      ReactToolTip.rebuild();
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const res = await api.getProducts(
        activeCategory,
        activePage,
        searchedItem
      );
      if (res.error === "") {
        setProducts(res.result.data);
        setTotalPages(res.result.pages);
        setActivePage(res.result.page);
      }
    };
    setLoading(true);
    setProducts([]);
    getProducts();
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [activeCategory, activePage, searchedItem]);

  useEffect(() => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setSearchedItem(search);
    }, 1000);
  }, [search]);

  return (
    <Container>
      <Header search={search} onSearch={setSearch} />
      {categories.length > 0 && (
        <CategoryArea>
          Select a Category
          <CategoryList>
            <CategoryItem
              data={{
                id: 0,
                name: "All categories",
                image: "/assets/food-and-restaurant.png",
              }}
              active={activeCategory}
              newActive={setActiveCategory}
            />
            {categories.map((item, index) => (
              <CategoryItem
                key={index}
                data={item}
                active={activeCategory}
                newActive={setActiveCategory}
              />
            ))}
          </CategoryList>
        </CategoryArea>
      )}
      {products.length > 0 && (
        <ProductArea>
          <ProductList>
            {products.map((item, index) => (
              <ProductItem
                key={index}
                data={item}
                modal={setModalOn}
                modalData={setModalData}
              />
            ))}
          </ProductList>
        </ProductArea>
      )}

      {products.length === 0 && loading === false && (
        <ProductArea>There are no products of this category</ProductArea>
      )}

      {totalPages >= 1 && products.length > 0 && (
        <ProductPaginationArea>
          {Array(totalPages)
            .fill(0)
            .map((item, index) => (
              <ProductPaginationItem
                key={index}
                active={activePage === index + 1 ? "#136713" : "#FFF"}
                onClick={() => setActivePage(index + 1)}
              >
                {index + 1}
              </ProductPaginationItem>
            ))}
        </ProductPaginationArea>
      )}
      <Modal modal={modalOn} setModal={setModalOn}>
        <ModalContent data={modalData} setModal={setModalOn} />
      </Modal>
    </Container>
  );
};

export default HomeScreen;
