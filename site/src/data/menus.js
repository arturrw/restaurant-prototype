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
          { name: 'Chilled pea & mint soup', price: '8', desc: 'Crème fraîche, olive oil, a little lemon zest.' },
          { name: 'Dorset crab on toast', price: '16', desc: 'Brown butter, sourdough, cayenne.' },
          { name: 'Devilled lamb kidneys', price: '11', desc: 'On dripping toast, mustard, watercress.' },
          { name: 'Heritage tomatoes, Ticklemore', price: '10', desc: "Isle of Wight tomatoes, goat's curd, basil oil.", veg: true },
        ],
      },
      {
        heading: 'And then',
        items: [
          { name: 'Marigold fish pie', price: '21', desc: "Smoked haddock, hen's egg, potato crust, buttered peas." },
          { name: 'Tamworth pork chop', price: '26', desc: 'Gooseberries, sage, dripping potatoes.' },
          { name: 'Onion & Berkswell tart', price: '18', desc: "Slow onions, ewe's cheese, thyme, leaf salad.", veg: true },
          { name: 'Steak & Marigold ale pie', price: '24', desc: 'Shin braised four hours, suet lid, mash, greens.' },
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
          { name: 'Oysters, Maldon no. 2', price: '4 ea.', desc: 'Shallot vinegar, or grilled with seaweed butter for one pound more.' },
          { name: 'Dorset crab, brown butter toast', price: '16', desc: 'Hand-picked white meat, lemon, a great deal of butter.' },
          { name: 'Smoked eel, beetroot, horseradish', price: '14', desc: 'Severn & Wye eel, roasted golden beets, crème fraîche.' },
          { name: 'Grilled courgettes, ricotta', price: '12', desc: 'Charred over coals, mint, toasted hazelnut.', veg: true },
          { name: 'Bone marrow, parsley, capers', price: '13', desc: 'Two halves, sea salt, plenty of toast.' },
        ],
      },
      {
        heading: 'Main',
        items: [
          { name: 'Turbot on the bone', price: '38', desc: 'Grilled over coals, brown shrimp butter, sea purslane. For two, 68.' },
          { name: 'Steak & Marigold ale pie', price: '24', desc: 'Shin braised four hours in our house bitter, suet lid, mash, greens.' },
          { name: 'Dexter rib for two', price: '74', desc: 'Thirty-five days dry-aged, bone marrow gravy, chips in dripping.' },
          { name: 'Guinea fowl, girolles, cider', price: '27', desc: 'Leg confit, breast roasted, Somerset cider cream.' },
          { name: 'Broad bean & sorrel risotto', price: '19', desc: 'Carnaroli, Old Winchester, lemon.', veg: true },
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
          { name: 'Dexter sirloin, Yorkshire pudding', price: '29', desc: 'Pink, carved thick. Roast potatoes in dripping, carrots, greens, horseradish, gravy.' },
          { name: 'Middle White pork, crackling', price: '26', desc: 'Bramley apple sauce, sage and onion, all the trimmings.' },
          { name: 'Chicken for the table', price: '52', desc: 'Whole Norfolk bird, bread sauce, bacon, trimmings. Serves three.' },
          { name: 'Roast squash & barley', price: '22', desc: 'Pearl barley, sage butter, hazelnuts, the same trimmings.', veg: true },
          { name: 'Extra Yorkshire pudding', price: '3', desc: 'You will want one.' },
          { name: 'Cauliflower cheese', price: '7', desc: 'Westcombe cheddar, breadcrumbs, browned at the top.' },
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
          { name: 'Burnt honey custard tart', price: '9', desc: 'Honey from the library roof, three doors down. Cut thin.' },
          { name: 'Gooseberry & elderflower fool', price: '8', desc: 'Kentish gooseberries, Jersey cream, shortbread.' },
          { name: 'Treacle sponge, clotted cream', price: '9', desc: 'Steamed to order; allow twenty minutes.' },
          { name: 'Chocolate & sea salt pot', price: '8', desc: 'Seventy per cent Madagascan, Maldon salt, olive oil.' },
          { name: "Neal's Yard cheeses", price: '12', desc: 'Three, quince, oat biscuits. Ask what is drinking well beside them.' },
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
          { name: 'Scotch egg, brown sauce', price: '7' },
          { name: 'Welsh rarebit', price: '9' },
          { name: 'Potted shrimps, toast', price: '11' },
        ],
      },
      {
        heading: 'And a few more',
        items: [
          { name: 'Pork pie, piccalilli', price: '8' },
          { name: 'Salted almonds & olives', price: '5' },
          { name: 'Cheese toastie, pickled onion', price: '8' },
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
