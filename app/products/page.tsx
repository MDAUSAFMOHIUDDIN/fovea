'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  SlidersHorizontal,
  Search,
  X,
  Sparkles,
  ArrowUpDown,
  LayoutGrid,
  Grid3X3,
  Columns,
  RotateCcw,
  Check,
  ChevronDown,
} from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/data';
import ProductCard from '@/components/common/ProductCard';
import QuickViewModal from '@/components/modals/QuickViewModal';

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export default function ProductsPage() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [onlyHomeTrial, setOnlyHomeTrial] = useState<boolean>(false);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // UI state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isDesktopFilterExpanded, setIsDesktopFilterExpanded] = useState(false);
  const [gridColumns, setGridColumns] = useState<'2' | '3' | '4'>('3');
  const [mobileColumns, setMobileColumns] = useState<'1' | '2'>('2');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Available Filter Options
  const genders = ['All', 'Men', 'Women', 'Unisex'];
  const categories = [
    { label: 'All Silhouettes', value: 'All' },
    { label: 'Eyeglasses (Optical)', value: 'Optical' },
    { label: 'Sunglasses', value: 'Sunglasses' },
    { label: 'Bespoke Titanium', value: 'Bespoke Titanium' },
  ];
  const shapes = [
    { label: 'All Shapes', value: 'All' },
    { label: 'Round & Panto', value: 'Round' },
    { label: 'Architectural Square', value: 'Square' },
    { label: 'Low-Profile Rectangle', value: 'Rectangle' },
    { label: 'Double-Bridge Aviator', value: 'Aviator' },
    { label: 'Sculpted Cat-Eye', value: 'Cat Eye' },
    { label: 'Classic Wayfarer', value: 'Wayfarer' },
  ];
  const colors = [
    { label: 'All Tones', value: 'All', hex: 'transparent' },
    { label: 'Black / Onyx', value: 'Black', hex: '#111317' },
    { label: 'Tortoise / Havana', value: 'Tortoise', hex: '#5B4028' },
    { label: 'Champagne / Amber', value: 'Champagne', hex: '#D6C4A5' },
    { label: 'Gold / Bronze', value: 'Gold', hex: '#C5A880' },
    { label: 'Silver / Platinum', value: 'Silver', hex: '#C2C5CD' },
    { label: 'Deep Navy', value: 'Navy', hex: '#0C162C' },
  ];
  const materials = [
    { label: 'All Materials', value: 'All' },
    { label: 'Japanese Aerospace Titanium', value: 'Titanium' },
    { label: 'Italian Bio-Acetate', value: 'Italian Acetate' },
    { label: 'Hybrid Metal & Acetate', value: 'Hybrid Metal & Acetate' },
    { label: 'Flexible Beta-Titanium', value: 'Beta-Titanium' },
  ];
  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under $400', value: 'under-400' },
    { label: '$400 — $450', value: '400-450' },
    { label: '$450+', value: 'over-450' },
  ];

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGender !== 'All') count++;
    if (selectedCategory !== 'All') count++;
    if (selectedShape !== 'All') count++;
    if (selectedColor !== 'All') count++;
    if (selectedMaterial !== 'All') count++;
    if (selectedPrice !== 'All') count++;
    if (onlyHomeTrial) count++;
    if (onlyNewArrivals) count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [
    selectedGender,
    selectedCategory,
    selectedShape,
    selectedColor,
    selectedMaterial,
    selectedPrice,
    onlyHomeTrial,
    onlyNewArrivals,
    searchQuery,
  ]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedGender('All');
    setSelectedCategory('All');
    setSelectedShape('All');
    setSelectedColor('All');
    setSelectedMaterial('All');
    setSelectedPrice('All');
    setOnlyHomeTrial(false);
    setOnlyNewArrivals(false);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSeries = product.series.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        const matchesShape = product.frameShape.toLowerCase().includes(query);
        if (!matchesName && !matchesSeries && !matchesMaterial && !matchesShape) {
          return false;
        }
      }

      // Gender
      if (selectedGender !== 'All') {
        if (product.gender !== selectedGender && product.gender !== 'Unisex') {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All') {
        if (product.category !== selectedCategory) return false;
      }

      // Frame Shape
      if (selectedShape !== 'All') {
        if (product.frameShape !== selectedShape) return false;
      }

      // Color
      if (selectedColor !== 'All') {
        if (product.colorFamily !== selectedColor) return false;
      }

      // Material
      if (selectedMaterial !== 'All') {
        if (product.materialType !== selectedMaterial) return false;
      }

      // Price
      if (selectedPrice === 'under-400') {
        if (product.price >= 400) return false;
      } else if (selectedPrice === '400-450') {
        if (product.price < 400 || product.price > 450) return false;
      } else if (selectedPrice === 'over-450') {
        if (product.price <= 450) return false;
      }

      // Home Trial
      if (onlyHomeTrial && !product.homeTrialEligible) return false;

      // New Arrivals
      if (onlyNewArrivals && !product.isNewArrival) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedGender,
    selectedCategory,
    selectedShape,
    selectedColor,
    selectedMaterial,
    selectedPrice,
    onlyHomeTrial,
    onlyNewArrivals,
    sortBy,
  ]);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  return (
    <div className="py-8 sm:py-16 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Editorial Compact Header */}
        <div className="border-b border-[#0C162C]/10 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
            <span>FOVEA EYEWEAR</span>
            <span>·</span>
            <span>Atelier Catalogue</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0C162C] tracking-tight">
            Find Your Frame.
          </h1>
          <p className="text-sm sm:text-base text-[#0C162C]/70 max-w-2xl leading-relaxed font-light">
            Handcrafted optical silhouettes and polarized sunglasses forged from Japanese aerospace
            titanium and cured Italian bio-acetate. Every frame is available for private Home Trial.
          </p>
        </div>

        {/* Desktop Quick Navigation & Search Strip */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#0C162C]/8 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Horizontal Category Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`min-h-[40px] px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                    selectedCategory === cat.value
                      ? 'bg-[#0C162C] text-[#FAF9F6] shadow-xs'
                      : 'text-[#0C162C]/70 hover:text-[#0C162C] hover:bg-[#FAF9F6]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <div className="h-6 w-px bg-[#0C162C]/10 mx-1 hidden sm:block" />

              {/* Gender Quick Toggle */}
              {['Men', 'Women'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() =>
                    setSelectedGender((prev) => (prev === gender ? 'All' : gender))
                  }
                  className={`min-h-[40px] px-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                    selectedGender === gender
                      ? 'bg-[#0D5C63] text-white shadow-xs'
                      : 'text-[#0C162C]/65 hover:text-[#0C162C] hover:bg-[#FAF9F6]'
                  }`}
                >
                  {gender}
                </button>
              ))}

              {/* New Arrivals Quick Toggle */}
              <button
                type="button"
                onClick={() => setOnlyNewArrivals(!onlyNewArrivals)}
                className={`min-h-[40px] px-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                  onlyNewArrivals
                    ? 'bg-[#0D5C63] text-white shadow-xs'
                    : 'text-[#0C162C]/65 hover:text-[#0C162C] hover:bg-[#FAF9F6]'
                }`}
              >
                New Arrivals
              </button>
            </div>

            {/* Live Search & Filter Drawer Trigger */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0C162C]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search silhouettes, titanium..."
                  className="w-full pl-10 pr-8 py-2.5 bg-[#FAF9F6] border border-[#0C162C]/10 rounded-xl text-xs text-[#0C162C] placeholder:text-[#0C162C]/40 focus:outline-none focus:ring-2 focus:ring-[#0C162C]/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0C162C]/40 hover:text-[#0C162C]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Desktop Filters Toggle Button */}
              <button
                type="button"
                onClick={() => setIsDesktopFilterExpanded(!isDesktopFilterExpanded)}
                className={`min-h-[42px] px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  isDesktopFilterExpanded || activeFilterCount > 0
                    ? 'bg-[#0C162C] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-[#0C162C] hover:bg-[#ECE8DF]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#0D5C63] text-white text-[10px] flex items-center justify-center font-mono">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isDesktopFilterExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Desktop Expandable Filter Drawer */}
          {isDesktopFilterExpanded && (
            <div className="pt-5 border-t border-[#0C162C]/8 space-y-5 animate-in fade-in duration-200">
              {/* Filter Grids */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Shape Filter */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0C162C]/60 block">
                    Frame Geometry
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {shapes.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSelectedShape(s.value)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedShape === s.value
                            ? 'bg-[#0C162C] text-white'
                            : 'bg-[#FAF9F6] text-[#0C162C]/70 hover:bg-[#ECE8DF]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0C162C]/60 block">
                    Material Craft
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {materials.map((m) => (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => setSelectedMaterial(m.value)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedMaterial === m.value
                            ? 'bg-[#0C162C] text-white'
                            : 'bg-[#FAF9F6] text-[#0C162C]/70 hover:bg-[#ECE8DF]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette Filter */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0C162C]/60 block">
                    Color Finish
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setSelectedColor(c.value)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedColor === c.value
                            ? 'bg-[#0C162C] text-white'
                            : 'bg-[#FAF9F6] text-[#0C162C]/70 hover:bg-[#ECE8DF]'
                        }`}
                      >
                        {c.value !== 'All' && (
                          <span
                            className="w-3 h-3 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                        )}
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & Home Trial */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0C162C]/60 block mb-1.5">
                      Price Bracket
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {priceRanges.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setSelectedPrice(p.value)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            selectedPrice === p.value
                              ? 'bg-[#0C162C] text-white'
                              : 'bg-[#FAF9F6] text-[#0C162C]/70 hover:bg-[#ECE8DF]'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setOnlyHomeTrial(!onlyHomeTrial)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        onlyHomeTrial
                          ? 'bg-[#0D5C63] text-white shadow-xs'
                          : 'bg-[#FAF9F6] text-[#0C162C]/70 hover:bg-[#ECE8DF]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Home Trial Eligible Only</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset Action */}
              {activeFilterCount > 0 && (
                <div className="flex items-center justify-between pt-3 border-t border-[#0C162C]/5 text-xs">
                  <span className="text-[#0C162C]/60">
                    {activeFilterCount} active criteria applied
                  </span>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="inline-flex items-center gap-1.5 text-xs text-[#0D5C63] hover:text-[#0C162C] font-semibold underline underline-offset-4"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Filter Badges Strip */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-[#0C162C]/60 uppercase tracking-wider font-semibold mr-1">
              Active:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                Search: &quot;{searchQuery}&quot;
                <button type="button" onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                {selectedCategory}
                <button type="button" onClick={() => setSelectedCategory('All')}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {selectedGender !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                Gender: {selectedGender}
                <button type="button" onClick={() => setSelectedGender('All')}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {selectedShape !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                Shape: {selectedShape}
                <button type="button" onClick={() => setSelectedShape('All')}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {selectedColor !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                Color: {selectedColor}
                <button type="button" onClick={() => setSelectedColor('All')}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {selectedMaterial !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                Material: {selectedMaterial}
                <button type="button" onClick={() => setSelectedMaterial('All')}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {selectedPrice !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                Price: {priceRanges.find((p) => p.value === selectedPrice)?.label}
                <button type="button" onClick={() => setSelectedPrice('All')}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {onlyHomeTrial && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0D5C63] text-white">
                Home Trial Eligible
                <button type="button" onClick={() => setOnlyHomeTrial(false)}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            {onlyNewArrivals && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0C162C] text-white">
                New Arrivals
                <button type="button" onClick={() => setOnlyNewArrivals(false)}>
                  <X className="w-3 h-3 hover:text-[#C5A880]" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs text-[#0C162C]/70 hover:text-[#0C162C] underline font-semibold ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Toolbar: Sorting & Responsive Grid Switcher */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-[#0C162C]/10 text-xs">
          {/* Result Count */}
          <div className="text-[#0C162C]/70 font-medium">
            <span>
              Showing <strong className="text-[#0C162C] font-semibold">{filteredProducts.length}</strong> of {PRODUCTS.length} handcrafted models
            </span>
          </div>

          {/* Right Tools: Sort & Grid Layout */}
          <div className="flex items-center gap-4">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[#0C162C]/50 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white border border-[#0C162C]/10 rounded-xl px-3 py-1.5 text-xs text-[#0C162C] font-semibold focus:outline-none focus:ring-1 focus:ring-[#0C162C] cursor-pointer"
                >
                  <option value="featured">Featured Atelier Picks</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Desktop Layout Toggle (2, 3, 4 cols) */}
            <div className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-xl border border-[#0C162C]/8">
              <button
                type="button"
                onClick={() => setGridColumns('2')}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridColumns === '2' ? 'bg-[#0C162C] text-white' : 'text-[#0C162C]/60 hover:text-[#0C162C]'
                }`}
                title="2 Columns (Editorial Impact)"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns('3')}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridColumns === '3' ? 'bg-[#0C162C] text-white' : 'text-[#0C162C]/60 hover:text-[#0C162C]'
                }`}
                title="3 Columns (Standard)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns('4')}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridColumns === '4' ? 'bg-[#0C162C] text-white' : 'text-[#0C162C]/60 hover:text-[#0C162C]'
                }`}
                title="4 Columns (Compact Grid)"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Column Switcher (1 vs 2 cols) */}
            <div className="lg:hidden flex items-center gap-1 bg-white p-1 rounded-xl border border-[#0C162C]/8">
              <button
                type="button"
                onClick={() => setMobileColumns('1')}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  mobileColumns === '1' ? 'bg-[#0C162C] text-white' : 'text-[#0C162C]/60'
                }`}
              >
                1 Col
              </button>
              <button
                type="button"
                onClick={() => setMobileColumns('2')}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  mobileColumns === '2' ? 'bg-[#0C162C] text-white' : 'text-[#0C162C]/60'
                }`}
              >
                2 Col
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-5 bg-white rounded-3xl border border-[#0C162C]/8 p-8">
            <div className="w-12 h-12 rounded-full bg-[#FAF9F6] mx-auto flex items-center justify-center text-[#0C162C]/40">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                No frames match your selection.
              </h3>
              <p className="text-sm text-[#0C162C]/65 max-w-md mx-auto font-light">
                Try loosening your filter criteria, resetting price ranges, or searching for other
                optical silhouettes.
              </p>
            </div>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid ${
              // Mobile layout: 1 col or 2 cols
              mobileColumns === '1' ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-3 sm:gap-6'
            } ${
              // Desktop layout
              gridColumns === '2'
                ? 'lg:grid-cols-2'
                : gridColumns === '4'
                ? 'lg:grid-cols-4'
                : 'lg:grid-cols-3'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
                compact={gridColumns === '4'}
              />
            ))}
          </div>
        )}

        {/* Curated Editorial Banner inside catalogue */}
        <div className="mt-16 bg-[#0C162C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C5A880]">
              Complimentary Home Experience
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-semibold leading-tight">
              Test 4 Frames in Your Own Mirror.
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
              Experience the tactile weight of Sabae titanium and cured Italian acetate in the comfort
              of your home. 5 days, prepaid return courier, zero commitment.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/home-trial"
                className="px-6 py-3 bg-white text-[#0C162C] hover:bg-[#F5F3EF] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Learn How Home Trial Works
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none hidden md:block bg-gradient-to-l from-white/10 to-transparent" />
        </div>
      </div>

      {/* Mobile Sticky Filter & Sort Bar (Appears on small screens) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/95 backdrop-blur-md border border-[#0C162C]/10 rounded-2xl shadow-xl p-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 min-h-[44px] px-4 bg-[#0C162C] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#0D5C63] text-white text-[10px] flex items-center justify-center font-mono font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            // cycle sort
            if (sortBy === 'featured') setSortBy('newest');
            else if (sortBy === 'newest') setSortBy('price-asc');
            else if (sortBy === 'price-asc') setSortBy('price-desc');
            else setSortBy('featured');
          }}
          className="min-h-[44px] px-4 bg-[#FAF9F6] border border-[#0C162C]/10 text-[#0C162C] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-[#0D5C63]" />
          <span className="capitalize">{sortBy.replace('-', ' ')}</span>
        </button>
      </div>

      {/* Mobile Filter Slide-Over / Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="flex-1 cursor-pointer"
          />

          <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-t border-[#0C162C]/10 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-[#0C162C]/10 flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                  Filter Eyewear
                </h3>
                <span className="text-xs text-[#0C162C]/60">
                  {filteredProducts.length} silhouettes matching
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-9 h-9 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#0C162C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Filter Body */}
            <div className="p-5 overflow-y-auto space-y-6 flex-1">
              {/* Category */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0C162C]/60 block">
                  Category
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setSelectedCategory(c.value)}
                      className={`min-h-[44px] px-3 rounded-xl text-xs font-semibold text-left transition-all ${
                        selectedCategory === c.value
                          ? 'bg-[#0C162C] text-white shadow-xs'
                          : 'bg-[#FAF9F6] text-[#0C162C]/75'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0C162C]/60 block">
                  Gender
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {genders.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`min-h-[40px] px-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedGender === g
                          ? 'bg-[#0C162C] text-white'
                          : 'bg-[#FAF9F6] text-[#0C162C]/75'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0C162C]/60 block">
                  Frame Geometry
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {shapes.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setSelectedShape(s.value)}
                      className={`min-h-[42px] px-3 rounded-xl text-xs font-medium text-left transition-all ${
                        selectedShape === s.value
                          ? 'bg-[#0C162C] text-white font-semibold'
                          : 'bg-[#FAF9F6] text-[#0C162C]/75'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0C162C]/60 block">
                  Material
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {materials.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setSelectedMaterial(m.value)}
                      className={`min-h-[42px] px-3 rounded-xl text-xs font-medium text-left transition-all ${
                        selectedMaterial === m.value
                          ? 'bg-[#0C162C] text-white font-semibold'
                          : 'bg-[#FAF9F6] text-[#0C162C]/75'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Finish */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0C162C]/60 block">
                  Frame Finish
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setSelectedColor(c.value)}
                      className={`min-h-[42px] px-3 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                        selectedColor === c.value
                          ? 'bg-[#0C162C] text-white font-semibold'
                          : 'bg-[#FAF9F6] text-[#0C162C]/75'
                      }`}
                    >
                      {c.value !== 'All' && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                      )}
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Bracket */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0C162C]/60 block">
                  Price
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {priceRanges.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setSelectedPrice(p.value)}
                      className={`min-h-[40px] px-3 rounded-xl text-xs font-medium transition-all ${
                        selectedPrice === p.value
                          ? 'bg-[#0C162C] text-white font-semibold'
                          : 'bg-[#FAF9F6] text-[#0C162C]/75'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Toggles */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOnlyHomeTrial(!onlyHomeTrial)}
                  className={`w-full min-h-[46px] px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between ${
                    onlyHomeTrial ? 'bg-[#0D5C63] text-white' : 'bg-[#FAF9F6] text-[#0C162C]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    Home Trial Eligible Only
                  </span>
                  {onlyHomeTrial && <Check className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bottom Sticky Action Buttons */}
            <div className="p-4 border-t border-[#0C162C]/10 bg-white grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="min-h-[48px] px-4 border border-[#0C162C]/15 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#0C162C]"
              >
                Reset All
              </button>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="min-h-[48px] px-4 bg-[#0C162C] text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                View {filteredProducts.length} Frames
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
