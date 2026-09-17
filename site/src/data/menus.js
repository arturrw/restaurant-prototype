import { U } from './images.js';

export const menuTabs = [
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'sunday', label: 'Sunday roast' },
  { id: 'pudding', label: 'Puddings' },
  { id: 'bar', label: 'Bar snacks' },
];

export const menus = {
  lunch: {
    note: 'Served noon until three, Monday to Saturday. Two courses 28, three courses 34.',
    columns: [
      {
        heading: 'To begin',
        items: [
          { name: 'Chilled pea & mint soup', price: '8', desc: 'Crème fraîche, olive oil, a little lemon zest.', image: U('photo-1594756202469-9ff9799b2e4e') },
          { name: 'Dorset crab on toast', price: '16', desc: 'Brown butter, sourdough, cayenne.', image: U('photo-1774806265809-6321ea782574') },
          { name: 'Devilled lamb kidneys', price: '11', desc: 'On dripping toast, mustard, watercress.', image: U('photo-1631637214648-2c6fd7f947ae') },
          { name: 'Heritage tomatoes, Ticklemore', price: '10', desc: "Isle of Wight tomatoes, goat's curd, basil oil.", veg: true, image: U('photo-1769458313937-b5ad8f84942e') },
        ],
      },
      {
        heading: 'And then',
        items: [
          { name: 'Marigold fish pie', price: '21', desc: "Smoked haddock, hen's egg, potato crust, buttered peas.", image: U('photo-1628642585518-2d63c2beab6b') },
          { name: 'Tamworth pork chop', price: '26', desc: 'Gooseberries, sage, dripping potatoes.', image: U('photo-1692106914421-e04e1066bd62') },
          { name: 'Onion & Berkswell tart', price: '18', desc: "Slow onions, ewe's cheese, thyme, leaf salad.", veg: true, image: U('photo-1687722129680-267194e2bc5a') },
          { name: 'Steak & Marigold ale pie', price: '24', desc: 'Shin braised four hours, suet lid, mash, greens.', image: U('photo-1582391123232-6130296f1fcd') },
        ],
      },
    ],
  },

  dinner: {
    note: "Sittings at 6.30 and 8.30. The card below is tonight's; it will be different tomorrow.",
    columns: [
      {
        heading: 'First',
        items: [
          { name: 'Oysters, Maldon no. 2', price: '4 ea.', desc: 'Shallot vinegar, or grilled with seaweed butter for one pound more.', image: U('photo-1578882422378-9ed72be08b5e') },
          { name: 'Dorset crab, brown butter toast', price: '16', desc: 'Hand-picked white meat, lemon, a great deal of butter.', image: U('photo-1774806265809-6321ea782574') },
          { name: 'Smoked eel, beetroot, horseradish', price: '14', desc: 'Severn & Wye eel, roasted golden beets, crème fraîche.', image: U('photo-1765100022784-5e72b418d34b') },
          { name: 'Grilled courgettes, ricotta', price: '12', desc: 'Charred over coals, mint, toasted hazelnut.', veg: true, image: U('photo-1742044609850-ed68d84c39ab') },
          { name: 'Bone marrow, parsley, capers', price: '13', desc: 'Two halves, sea salt, plenty of toast.', image: U('photo-1612827788868-c8632040ab64') },
        ],
      },
      {
        heading: 'Main',
        items: [
          { name: 'Turbot on the bone', price: '38', desc: 'Grilled over coals, brown shrimp butter, sea purslane. For two, 68.', image: U('photo-1551014700-0ca41391f312') },
          { name: 'Steak & Marigold ale pie', price: '24', desc: 'Shin braised four hours in our house bitter, suet lid, mash, greens.', image: U('photo-1582391123232-6130296f1fcd') },
          { name: 'Dexter rib for two', price: '74', desc: 'Thirty-five days dry-aged, bone marrow gravy, chips in dripping.', image: U('photo-1565299524732-d2149c7eabf5') },
          { name: 'Guinea fowl, girolles, cider', price: '27', desc: 'Leg confit, breast roasted, Somerset cider cream.', image: U('photo-1567121938596-6d9d015d348b') },
          { name: 'Broad bean & sorrel risotto', price: '19', desc: 'Carnaroli, Old Winchester, lemon.', veg: true, image: U('photo-1609770424775-39ec362f2d94') },
        ],
      },
    ],
    panels: [
      {
        heading: 'Sides — all 6',
        body: 'Chips in beef dripping · Buttered greens · Jersey Royals, mint · Leaf salad, house dressing · Cauliflower cheese',
      },
      {
        heading: 'Cheese',
        body: "Three British cheeses from Neal's Yard, quince, oat biscuits — 12. A glass of Sauternes alongside — 9.",
      },
    ],
  },

  sunday: {
    note: 'One sitting, noon until the beef runs out. Booking strongly advised.',
    columns: [
      {
        heading: 'The roast',
        items: [
          { name: 'Dexter sirloin, Yorkshire pudding', price: '29', desc: 'Pink, carved thick. Roast potatoes in dripping, carrots, greens, horseradish, gravy.', image: U('photo-1635897411141-7bd2b9c6ab16') },
          { name: 'Middle White pork, crackling', price: '26', desc: 'Bramley apple sauce, sage and onion, all the trimmings.', image: U('photo-1625477811233-044633d10dd1') },
          { name: 'Chicken for the table', price: '52', desc: 'Whole Norfolk bird, bread sauce, bacon, trimmings. Serves three.', image: U('photo-1630564510761-a560db92a09b') },
          { name: 'Roast squash & barley', price: '22', desc: 'Pearl barley, sage butter, hazelnuts, the same trimmings.', veg: true, image: U('photo-1560513977-6faee53459d7') },
          { name: 'Extra Yorkshire pudding', price: '3', desc: 'You will want one.', image: U('photo-1765568741171-71bbaf721747') },
          { name: 'Cauliflower cheese', price: '7', desc: 'Westcombe cheddar, breadcrumbs, browned at the top.', image: U('photo-1626624155295-d0152ab4200c') },
        ],
      },
    ],
  },

  pudding: {
    note: 'Made in the morning, finished to order. Sweet wines by the glass on the drinks list.',
    columns: [
      {
        heading: 'Puddings',
        items: [
          { name: 'Burnt honey custard tart', price: '9', desc: 'Honey from the library roof, three doors down. Cut thin.', image: U('photo-1567624725806-227866a3f784') },
          { name: 'Gooseberry & elderflower fool', price: '8', desc: 'Kentish gooseberries, Jersey cream, shortbread.', image: U('photo-1633893215271-f7e1fca081ad') },
          { name: 'Treacle sponge, clotted cream', price: '9', desc: 'Steamed to order; allow twenty minutes.', image: U('photo-1644754378163-7575322f817f') },
          { name: 'Chocolate & sea salt pot', price: '8', desc: 'Seventy per cent Madagascan, Maldon salt, olive oil.', image: U('photo-1760447528604-7878bb0940eb') },
          { name: "Neal's Yard cheeses", price: '12', desc: 'Three, quince, oat biscuits. Ask what is drinking well beside them.', image: U('photo-1557109965-b9bf442aeb97') },
        ],
      },
    ],
  },

  bar: {
    note: 'At the bar, all day, no booking. Eaten standing up, ideally.',
    columns: [
      {
        heading: 'From the counter',
        items: [
          { name: 'Scotch egg, brown sauce', price: '7', image: U('photo-1576748092413-ee713ea2f178') },
          { name: 'Welsh rarebit', price: '9', image: U('photo-1528736235302-52922df5c122') },
          { name: 'Potted shrimps, toast', price: '11', image: U('photo-1628556820645-63ba5f90e6a2') },
        ],
      },
      {
        heading: 'And a few more',
        items: [
          { name: 'Pork pie, piccalilli', price: '8', image: U('photo-1756137948749-84e73141137b') },
          { name: 'Salted almonds & olives', price: '5', image: U('photo-1634736482829-e2d431eda121') },
          { name: 'Cheese toastie, pickled onion', price: '8', image: U('photo-1709689156424-16fe0e05b47b') },
        ],
      },
    ],
  },
};

export const signatures = [
  {
    name: 'Dorset crab, brown butter toast',
    price: '16',
    desc: 'Hand-picked white meat, lemon, a great deal of butter, sourdough from Elder Street.',
    key: 'sigCrab',
  },
  {
    name: 'Steak & Marigold ale pie',
    price: '24',
    desc: 'Shin braised four hours in our house bitter, suet lid, mash and greens.',
    key: 'sigPie',
  },
  {
    name: 'Burnt honey custard tart',
    price: '9',
    desc: 'Honey from the roof of the Kensington Library, three doors down. Cut thin.',
    key: 'sigTart',
  },
];
