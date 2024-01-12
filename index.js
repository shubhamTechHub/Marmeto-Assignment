let tabList = [{
    id: "Men",
    tab: "Men"
},
{
    id: "Women",
    tab: "Women"
},
{
    id: "Kids",
    tab: "Kids"
}
];

let tabsContainerEl = document.getElementById("tabsContainer");
let productListContainerEl = document.getElementById("productListContainer");

let activeTabId = tabList[0].id;

function createAndAppendTabs() {
    let tabListEl = document.createElement("li");
    tabsContainerEl.appendChild(tabListEl);

    tabList.forEach(function (eachTab) {
        var tab = document.createElement('button');
        tab.className = 'tab';
        tab.textContent = eachTab.tab;
        tab.classList.add("tab-btn");
        if (eachTab.tab === activeTabId) {
            tab.classList.add('active-tab-btn');
        }
        tab.addEventListener('click', function () {
            addActiveTabClassList(tab);
            activeTabId = eachTab.id;
            sendGetRequest();
        });
        tabListEl.appendChild(tab);
    });
}

function addActiveTabClassList(clickedTab) {
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab) {
        tab.classList.remove('active-tab-btn');
    });

    clickedTab.classList.add('active-tab-btn');
}


function createAndAppendProductList(product) {
    let {
        badge_text,
        image,
        title,
        vendor,
        price,
        compare_at_price
    } = product;

    let discount = Math.round(((compare_at_price - price) / compare_at_price) * 100)

    let productListEl = document.createElement("li");
    productListEl.classList.add("product-item-container");
    productListContainerEl.appendChild(productListEl);

    let productImageContainer = document.createElement("div");
    productImageContainer.classList.add("product-item-image");
    productImageContainer.style.backgroundImage = `url(${image})`;
    productListEl.appendChild(productImageContainer);

    let badgeEl = document.createElement("p");
    badgeEl.classList.add("badge");
    badgeEl.textContent = badge_text;

    if (badge_text === null) {
        badgeEl.classList.add("d-none")
    }

    productImageContainer.appendChild(badgeEl);
    
    let productItemDetailsCardEl = document.createElement("div");
    productItemDetailsCardEl.classList.add("product-item-details-card");
    productListEl.appendChild(productItemDetailsCardEl);

    let titleAndVendorCard = document.createElement("div");
    titleAndVendorCard.classList.add("product-item-card");
    productItemDetailsCardEl.appendChild(titleAndVendorCard);

    let titleEl = document.createElement("h1");
    titleEl.textContent = title;
    titleEl.classList.add("product-item-title");
    titleAndVendorCard.appendChild(titleEl);

    let vendorEl = document.createElement("p");
    vendorEl.classList.add("product-item-vendor")
    vendorEl.textContent = vendor;
    titleAndVendorCard.appendChild(vendorEl);

    let priceAndDiscountCard = document.createElement("div");
    priceAndDiscountCard.classList.add("price-discount-card");
    productItemDetailsCardEl.appendChild(priceAndDiscountCard);

    let priceCard = document.createElement("div");
    priceCard.classList.add("price-card");
    priceAndDiscountCard.appendChild(priceCard);

    let priceEl = document.createElement("p");
    priceEl.classList.add("price")
    priceEl.textContent = "Rs. " + price + ".00";
    priceCard.appendChild(priceEl);

    let comparePriceEl = document.createElement("p");
    comparePriceEl.classList.add("compare-price");
    comparePriceEl.textContent = compare_at_price + ".00";
    priceCard.appendChild(comparePriceEl);

    let discountPercentageEl = document.createElement("p");
    discountPercentageEl.classList.add("discount");
    discountPercentageEl.textContent = discount + "% Off";
    priceAndDiscountCard.appendChild(discountPercentageEl);

    let addToCartButtonEl = document.createElement("button");
    addToCartButtonEl.classList.add("add-to-cart-button");
    addToCartButtonEl.textContent = "Add to Cart";
    productItemDetailsCardEl.appendChild(addToCartButtonEl);
}

function displayProducts(products) {
    productListContainerEl.textContent = "";
    for (let eachProduct of products.category_products) {
        createAndAppendProductList(eachProduct);
    }
}

const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

const sendGetRequest = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.categories);
        let productObject = data.categories.find(eachItem => eachItem.category_name === activeTabId);
        displayProducts(productObject);
    } catch (error) {
        console.log(error);
    }
};

createAndAppendTabs();
sendGetRequest();