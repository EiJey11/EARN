import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import { add } from './utilities/shoppingCartLogic';
import { sweFormat } from './utilities/currencyFormatter';
import { useEffect } from 'react';
import { missingImage } from './utilities/handleMissingImage';
import './ProductDetail.css'

export default function ProductDetail() {

  let s = useStates('main');

  // A local state for this component
  // with one property/state var - buyQuantity
  let localState = useStates({
    buyQuantity: 1
  });

  // Set the buyQuantity to 1 when the component mounts / "page load"
  useEffect(() => {
    localState.buyQuantity = 1;
  }, []);

  // Find the product
  let { id } = useParams();
  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }

  let { name, description, price, categoryId } = product;

  // Find the category
  let categoryName = s.categories.find(category =>
    category.id === categoryId
  )?.name || 'none';

  let navigate = useNavigate();

  function buy() {
    // Add the product to the cart
    add(product, localState.buyQuantity);
    // Show the cart
    navigate('/shopping-cart');
  }

  return <Container>
      <Row><h1 className="mb-3 detal_name">{name}</h1></Row>
      <Row><h4>Kategori: {categoryName}</h4></Row>
      <Row><img onError={event => missingImage(event, name)} className="float-end ms-4 img_detal" style={{ width: 400, height: 400, objectFit: 'contain' }} src={`/images/products/${id}.jpg?${Math.random()}`} /></Row>
      <Row><p>{description}</p></Row>
      <Row><p className="price_detal"><b>Pris: {sweFormat(price)}</b></p></Row>
      <Row><Col className="mb-3 bottom">
        <button type="button" onClick={buy} className="btn_login btn_detal">Köp</button>
        <input style={{ width: 140 }} className="float-end mt-3 me-6" type="number" {...localState.bind('buyQuantity')} />
      </Col></Row>
      <Col>
      <Link to={`/product-list`}>
        <button type="button" className="btn_login btn_detal">Tillbaka</button>
        <hr />
      </Link>
    </Col>
  </Container>
}