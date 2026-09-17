export const U = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export const heroSlides = [
  { src: U('photo-1767745815926-93e3d674431b', 1900), alt: 'The pub frontage under its hanging garden' },
  { src: U('photo-1779372178902-5d355e0dfe06', 1900), alt: 'The bar, brass taps and mahogany' },
  { src: U('photo-1573560751375-d09d55dd427d', 1900), alt: 'Flowers along the facade in full summer' },
  { src: U('photo-1766832255363-c9f060ade8b0', 1900), alt: 'The dining room laid for service' },
];

export const img = {
  featKitchen: U('photo-1746494557235-9e99f3193101'),
  featBar: U('photo-1629808222864-282aa0cb3ae0'),
  featFlowers: U('photo-1548337357-2910deeae339'),

  sigCrab: U('photo-1774806265809-6321ea782574'),
  sigPie: U('photo-1582391123232-6130296f1fcd'),
  sigTart: U('photo-1567624725806-227866a3f784'),

  dining: U('photo-1646601110870-09b30c00bd92', 1200),
  cellar: U('photo-1615780324244-29b71ae12f7d', 1200),
  wineCellar: U('photo-1633119985201-7fb2c6eb1aec', 1200),
  visitMap: U('photo-1627245084666-199325217d5b', 1200),
};

export const gallery = [
  { id: 'gal-1', src: U('photo-1573560751375-d09d55dd427d'), caption: 'The facade in June' },
  { id: 'gal-2', src: U('photo-1779372178480-28385582bf53'), caption: 'The horseshoe bar, original 1848' },
  { id: 'gal-3', src: U('photo-1711830866616-0efe3bd62798'), caption: 'December, lights lit at four' },
  { id: 'gal-4', src: U('photo-1766832255363-c9f060ade8b0'), caption: 'The upstairs room, laid for eight' },
  { id: 'gal-5', src: U('photo-1624419845204-7a011c2c902c'), caption: 'Turbot, over coals' },
  { id: 'gal-6', src: U('photo-1762113246607-4299ec3f3214'), caption: 'Rosalind Vane, half past five' },
  { id: 'gal-7', src: U('photo-1546622891-02c72c1537b6'), caption: 'Bitter, pulled properly' },
  { id: 'gal-8', src: U('photo-1652862730477-782a6dcb2385'), caption: 'The snug, fire from October' },
  { id: 'gal-9', src: U('photo-1558861122-40aa75d3a841'), caption: 'Replanting day, four times a year' },
];
