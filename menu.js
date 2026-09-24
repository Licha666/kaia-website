/* KAIA — menu page: data, search, filters, dropdown category bars */
(function () {
  "use strict";

  /* ---------- data (SAMPLE menu — owner should edit names/prices) ---------- */
  var CATS = [
    ["khachapuri", "Khachapuri"],
    ["khinkali", "Khinkali"],
    ["soups", "Soups"],
    ["starters", "Starters"],
    ["grill", "Grill & Mains"],
    ["desserts", "Desserts"],
    ["drinks", "Drinks & Wine"]
  ];

  var ITEMS = [
    // Khachapuri
    { name: "Adjaruli Khachapuri", price: 12, cat: "khachapuri", img: "dish-khachapuri.jpg", desc: "Boat-shaped bread, molten sulguni, egg yolk and butter. Stir, tear, dip." },
    { name: "Imeruli Khachapuri", price: 10, cat: "khachapuri", img: "dish-khachapuri.jpg", veg: 1, desc: "The classic round cheese bread from Imereti, golden and gooey inside." },
    { name: "Megruli Khachapuri", price: 11, cat: "khachapuri", img: "dish-khachapuri.jpg", veg: 1, desc: "Imeruli topped with an extra layer of melted cheese — double the pull." },
    { name: "Kubdari", price: 12, cat: "khachapuri", img: "gallery-2.jpg", desc: "Svaneti meat-filled bread, spiced with cumin and slow-baked." },

    // Khinkali
    { name: "Khinkali — Beef & Pork", price: 2.8, label: "€2.8 / pc", cat: "khinkali", img: "dish-khinkali.jpg", desc: "Hand-pleated soup dumplings. Hold by the knot, sip the broth, then bite. Sold in fours." },
    { name: "Khinkali — Lamb", price: 3, label: "€3 / pc", cat: "khinkali", img: "gallery-3.jpg", desc: "Fragrant lamb with onion and cumin, pleated by hand. Sold in fours." },
    { name: "Khinkali — Mushroom", price: 2.5, label: "€2.5 / pc", cat: "khinkali", img: "dish-khinkali.jpg", veg: 1, desc: "Juicy forest-mushroom filling with black pepper. Sold in fours." },
    { name: "Khinkali — Suluguni & Potato", price: 2.5, label: "€2.5 / pc", cat: "khinkali", img: "dish-khinkali.jpg", veg: 1, desc: "Comfort in a pouch — cheesy, creamy and gently spiced. Sold in fours." },

    // Soups
    { name: "Kharcho", price: 9, cat: "soups", img: "dish-kharcho.jpg", desc: "Hearty beef and walnut soup with tkemali plum and warm spices." },
    { name: "Chikhirtma", price: 8, cat: "soups", img: "dish-kharcho.jpg", desc: "Velvety chicken soup thickened with egg and a whisper of vinegar." },
    { name: "Mushroom Soup with Suluguni", price: 8, cat: "soups", img: "dish-kharcho.jpg", veg: 1, desc: "Creamy mushroom soup finished with melted suluguni cheese." },

    // Starters
    { name: "Pkhali Trio", price: 8, cat: "starters", img: "dish-pkhali.jpg", veg: 1, desc: "Spinach, beetroot and bean pkhali — walnut paste, pomegranate, warm bread." },
    { name: "Badrijani", price: 8, cat: "starters", img: "dish-pkhali.jpg", veg: 1, desc: "Grilled eggplant rolls filled with spiced walnut paste and garlic." },
    { name: "Lobio", price: 7, cat: "starters", img: "dish-pkhali.jpg", veg: 1, desc: "Slow-cooked beans with herbs and spices, served in a clay pot." },
    { name: "Georgian Salad", price: 7, cat: "starters", emoji: "🥗", veg: 1, desc: "Tomato, cucumber, red onion and walnuts with a tangy dressing." },
    { name: "Suluguni Cheese Plate", price: 9, cat: "starters", img: "gallery-4.jpg", veg: 1, desc: "Thick slices of grilled suluguni with honey and hot bread." },

    // Grill & mains
    { name: "Mtsvadi — Pork Skewers", price: 14, cat: "grill", img: "dish-grill.jpg", desc: "Marinated pork grilled over coals, served with tkemali sauce." },
    { name: "Grilled Vegetables & Halloumi", price: 11, cat: "grill", img: "dish-grill.jpg", veg: 1, desc: "A guest favourite — smoky layered vegetables with golden halloumi." },
    { name: "Chicken Tapaka", price: 13, cat: "grill", img: "dish-grill.jpg", desc: "Pan-pressed chicken with crispy skin, garlic and spices." },
    { name: "Ojakhuri", price: 13, cat: "grill", img: "gallery-3.jpg", desc: "Sizzling pan of roasted potatoes with pork, onions and spices." },
    { name: "Chakapuli", price: 15, cat: "grill", img: "gallery-2.jpg", desc: "Spring veal stew with tkemali, tarragon and white wine." },

    // Desserts
    { name: "Churchkhela", price: 4, cat: "desserts", emoji: "🍬", veg: 1, desc: "Grape-must and walnut 'candles' — Georgia's original energy bar." },
    { name: "Pelamushi", price: 5, cat: "desserts", emoji: "🍮", veg: 1, desc: "Silky grape pudding topped with crushed walnuts." },
    { name: "Napoleon Cake", price: 6, cat: "desserts", emoji: "🍰", veg: 1, desc: "Layered puff pastry and light custard — a Caucasus classic." },

    // Drinks & wine
    { name: "Saperavi — Red (glass)", price: 6, cat: "drinks", emoji: "🍷", desc: "Bold, dark-fruit qvevri red from Georgia's most loved grape." },
    { name: "Rkatsiteli — Amber (glass)", price: 6, cat: "drinks", emoji: "🥂", desc: "Skin-contact amber wine: tannic, aromatic, 8,000 years of tradition." },
    { name: "Tarragon Lemonade", price: 4, cat: "drinks", emoji: "🍹", veg: 1, desc: "House-made, bright green and dangerously refreshing." },
    { name: "Borjomi", price: 3.5, cat: "drinks", emoji: "🫧", veg: 1, desc: "Georgia's famous mineral water, naturally carbonated." },
    { name: "Chacha", price: 5, cat: "drinks", emoji: "🥃", desc: "Georgian grape brandy. Smooth — and not to be underestimated." }
  ];

  /* ---------- state ---------- */
  var state = { q: "", cat: "all", price: "any" };

  var listEl = document.getElementById("menu-list");
  var chipsEl = document.getElementById("cat-chips");
  var priceEl = document.getElementById("price-filter");
  var searchEl = document.getElementById("menu-search");
  var countEl = document.getElementById("results-count");
  var emptyEl = document.getElementById("menu-empty");

  function catName(id) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i][0] === id) return CATS[i][1];
    return id;
  }

  /* ---------- build category bars (dropdowns) ---------- */
  listEl.innerHTML = CATS.map(function (c) {
    return '<section class="menu-cat" data-cat="' + c[0] + '">' +
      '<button class="cat-bar" type="button" aria-expanded="true">' +
        '<span class="cat-name">' + c[1] + '</span>' +
        '<span class="cat-count"></span>' +
        '<span class="cat-chev" aria-hidden="true">▾</span>' +
      '</button>' +
      '<div class="cat-panel"></div>' +
    '</section>';
  }).join("");

  /* category chips */
  chipsEl.innerHTML = '<button class="cat-chip active" data-cat="all" type="button">All</button>' +
    CATS.map(function (c) {
      return '<button class="cat-chip" data-cat="' + c[0] + '" type="button">' + c[1] + '</button>';
    }).join("");

  /* ---------- dish card (wide list row) ---------- */
  function cardHTML(i) {
    var media = i.img
      ? '<div class="mi-media"><img src="' + i.img + '" alt="' + i.name + '" loading="lazy"></div>'
      : '<div class="mi-media mi-ph" aria-hidden="true">' + (i.emoji || "🍽️") + '</div>';
    var veg = i.veg ? '<span class="chip chip-veg">Vegetarian</span>' : "";
    return '<article class="menu-item">' + media +
      '<div class="mi-body">' +
        '<div class="mi-top"><h3>' + i.name + '</h3>' +
        '<span class="mi-price">' + (i.label || ("€" + i.price)) + '</span></div>' +
        '<p>' + i.desc + '</p>' +
        '<div class="mi-meta">' + veg + '<span class="chip">' + catName(i.cat) + '</span></div>' +
      '</div></article>';
  }

  /* ---------- filtering ---------- */
  function priceOk(p) {
    switch (state.price) {
      case "under10": return p < 10;
      case "mid": return p >= 10 && p < 15;
      case "over15": return p >= 15;
      default: return true;
    }
  }

  function apply() {
    var q = state.q.trim().toLowerCase();
    var filtering = q !== "" || state.cat !== "all" || state.price !== "any";
    var shown = 0;

    var sections = listEl.querySelectorAll(".menu-cat");
    for (var s = 0; s < sections.length; s++) {
      var sec = sections[s];
      var visible = ITEMS.filter(function (i) {
        var text = (i.name + " " + i.desc).toLowerCase();
        return (!q || text.indexOf(q) !== -1) &&
               (state.cat === "all" || i.cat === state.cat) &&
               priceOk(i.price);
      });
      sec.style.display = visible.length ? "" : "none";
      sec.querySelector(".cat-panel").innerHTML = visible.map(cardHTML).join("");
      sec.querySelector(".cat-count").textContent =
        visible.length + (visible.length === 1 ? " dish" : " dishes");
      /* while filtering, keep bars open so results are visible */
      if (filtering) setCollapsed(sec, false);
      shown += visible.length;
    }

    countEl.textContent = "Showing " + shown + " of " + ITEMS.length + " dishes";
    emptyEl.hidden = shown > 0;
  }

  function setCollapsed(sec, collapsed) {
    sec.classList.toggle("collapsed", collapsed);
    sec.querySelector(".cat-bar").setAttribute("aria-expanded", String(!collapsed));
  }

  /* ---------- events ---------- */
  /* accordion toggle */
  listEl.addEventListener("click", function (e) {
    var bar = e.target.closest(".cat-bar");
    if (!bar) return;
    var sec = bar.closest(".menu-cat");
    setCollapsed(sec, !sec.classList.contains("collapsed"));
  });

  /* chips */
  chipsEl.addEventListener("click", function (e) {
    var chip = e.target.closest(".cat-chip");
    if (!chip) return;
    state.cat = chip.dataset.cat;
    var chips = chipsEl.querySelectorAll(".cat-chip");
    for (var i = 0; i < chips.length; i++) chips[i].classList.toggle("active", chips[i] === chip);
    apply();
  });

  /* price */
  priceEl.addEventListener("change", function () {
    state.price = priceEl.value;
    apply();
  });

  /* search (debounced) */
  var t;
  searchEl.addEventListener("input", function () {
    clearTimeout(t);
    t = setTimeout(function () {
      state.q = searchEl.value;
      apply();
    }, 150);
  });

  /* clear filters */
  document.getElementById("clear-filters").addEventListener("click", function () {
    state = { q: "", cat: "all", price: "any" };
    searchEl.value = "";
    priceEl.value = "any";
    var chips = chipsEl.querySelectorAll(".cat-chip");
    for (var i = 0; i < chips.length; i++) chips[i].classList.toggle("active", chips[i].dataset.cat === "all");
    apply();
  });

  apply();
})();
