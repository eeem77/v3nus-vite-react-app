import React, { useState, useRef } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Rating } from "primereact/rating";
import { Image } from "primereact/image";
import { Galleria } from "primereact/galleria";
import { Dialog } from 'primereact/dialog';
import "./DataViewInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons'
import products from "./DataProducts";
import Marquee from "react-fast-marquee"

const DataViewInfo = () => {
  const galleria1 = useRef(null);
  const [images, setImages] = useState([
    {
      itemImageSrc: "",
      thumbnailImageSrc: "",
      alt: "",
      title: "",
    },
  ]);
  const [filterProducts, setFilterProducts] = useState([...products]);
  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState("All");
  //const [position, setPosition] = useState('center');
  const [displayBasic, setDisplayBasic] = useState(false);
  const sortOptions = [
    { label: "All", value: "All" },
    { label: "Sweaters", value: "Sweaters" },
    { label: "Blouses", value: "Blouses" },
    { label: "Pants", value: "Pants" },
    { label: "Skirts", value: "Skirts" },
    { label: "Shoes", value: "Shoes" },
    { label: "Jackets", value: "Jackets" },
    { label: "Handbags", value: "Handbags" },
    { label: "Flannels", value: "Flannels" },
  ];

  const onHide = () => {
    setDisplayBasic(false);
  }

  const orderSort = (value) => {
    let result = [];
    products.map((data) => {
      if (data.category === value) result.push(data);
      return null;
    });
    return result;
  };

  const onSortChange = (event) => {
    event.preventDefault()
    const value = event.value;
    const productOrderSearch =
      value !== "All" ? orderSort(value) : [...products];
    setFilterProducts(productOrderSearch);
    setSortKey(value);
  };

  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <Image
            src={data.image}
            onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.name}
            preview
          />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action">
            {/* <span className="product-price"></span> */}
            <FontAwesomeIcon icon={data.gender === "female" ? faVenus : faMars} size="lg" style={data.gender === "female" ? { color: "#f9a8d4" } : { color: "#3b82f6" }} />
            {data.images ? disabled = false : disabled = true}
            <Button icon="pi pi-images" className="p-button-rounded p-button-secundary" aria-label="Search" onClick={(e) => galleriaOpen(data)} disabled={disabled} />
            {
              data.inventoryStatus === "OUTOFSTOCK" &&
              <Button
                icon="pi pi-whatsapp"
                label="Buy"
                disabled={data.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
            }
            {
              data.inventoryStatus === "INSTOCK" &&
              <a
                href="https://wa.me/584127992491"
                target="_blank"
                rel="noopener noreferrer"
                className={`link-${data.inventoryStatus.toLowerCase()}`}
              >
                <Button
                  icon="pi pi-whatsapp"
                  label="Buy"
                  disabled={data.inventoryStatus === "OUTOFSTOCK"}
                ></Button>
              </a>
            }
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  };

  let disabled

  const renderGridItem = (data) => {
    return (
      <div className="col-12 md:col-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
          <div className="product-grid-item-content">
            <Image
              src={data.image}
              onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
              preview
            />
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="product-grid-item-bottom" style={{ paddingTop: "10px" }}>
            {/* <span className="product-price"></span> */}
            {data.images ? disabled = false : disabled = true}
            <Button icon="pi pi-images" className="p-button-rounded p-button-secundary" aria-label="Search" onClick={(e) => galleriaOpen(data)} disabled={disabled} />
            <FontAwesomeIcon icon={data.gender === "female" ? faVenus : faMars} size="lg" style={data.gender === "female" ? { color: "#f9a8d4" } : { color: "#3b82f6" }} />
            {
              data.inventoryStatus === "OUTOFSTOCK" &&
              <Button
                icon="pi pi-whatsapp"
                label="Buy"
                disabled={data.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
            }
            {
              data.inventoryStatus === "INSTOCK" &&
              <a
                href="https://wa.me/584127992491"
                target="_blank"
                rel="noopener noreferrer"
                className={`link-${data.inventoryStatus.toLowerCase()}`}
              >
                <Button
                  icon="pi pi-whatsapp"
                  label="Buy"
                  disabled={data.inventoryStatus === "OUTOFSTOCK"}
                ></Button>
              </a>
            }
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const elementIconVenus = <FontAwesomeIcon icon={faVenus} size="lg" style={{ color: "#f9a8d4" }} />
  const elementIconMars = <FontAwesomeIcon icon={faMars} size="lg" style={{ color: "#3b82f6" }} />

  const filterGender = (e, gender) => {
    e.preventDefault()
    let productsFinal = [...products]
    let productFinal = []
    productsFinal.map((data) => {
      if (sortKey !== 'All') {
        if (data.gender === gender && data.category === sortKey) productFinal.push(data)
      } else {
        if (data.gender === gender) productFinal.push(data)
      }
      return null
    })
    if (productFinal.length > 0) {
      setFilterProducts(productFinal)
    } else {
      setDisplayBasic(true)
    }
  }

  const renderHeader = () => {
    return (
      <div className="grid">
        <div className="col-6" style={{ textAlign: "left" }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Category"
            onChange={onSortChange}
          />
          <Button icon={elementIconVenus} className="p-button-rounded p-button-secundary p-button-text" aria-label="Bookmark" onClick={(e) => filterGender(e, 'female')} />
          <Button icon={elementIconMars} className="p-button-rounded p-button-secundary p-button-text" aria-label="Bookmark" onClick={(e) => filterGender(e, 'male')} />
        </div>
        <div className="col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const responsiveOptions2 = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const galleriaOpen = (item) => {
    let images = []
    //console.log(item.images);
    if (item.images) {
      item.images.map((image) => {
        images.push({
          itemImageSrc: image,
          thumbnailImageSrc: image,
          alt: item.name,
          title: item.name,
        })
        return null
      })
    } else {
      images = [
        {
          itemImageSrc: item.image,
          thumbnailImageSrc: item.image,
          alt: item.name,
          title: item.name,
        }
      ]
    }

    setImages(images)
    galleria1.current.show()
  }

  const itemTemplateGallery = (item) => {
    return <img src={item.itemImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  }

  const thumbnailTemplateGallery = (item) => {
    return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  }

  let maxWidth
  window.innerWidth > 500 ? maxWidth = '30%' : maxWidth = '70%'

  return (
    <>
      <Dialog header="Mensaje" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide()}>
        <p>La categoría por la que desea filtrar no es permitida o el producto no existe en el inventario</p>
      </Dialog>
      <div className="card">
        <Galleria ref={galleria1} value={images} responsiveOptions={responsiveOptions2} numVisible={4} style={{ maxWidth: maxWidth }}
          circular fullScreen showItemNavigators item={itemTemplateGallery} thumbnail={thumbnailTemplateGallery} />
      </div>
      <Marquee className="fontload">Vístete&nbsp; de&nbsp; moda&nbsp; con&nbsp; nosotros&nbsp;&nbsp;</Marquee>
      <div className="dataview-demo">
        <div className="card">
          <DataView
            value={filterProducts}
            layout={layout}
            header={header}
            itemTemplate={itemTemplate}
            paginator
            rows={9}
          />
        </div>
      </div>
    </>
  );
};

export default DataViewInfo;
