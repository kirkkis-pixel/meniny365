export type Vendor = "alza" | "mall" | "bonami" | "brasty";

export interface AffiliateConfig {
  baseUrl: string;
  refParam: string;
  productParam: string;
  vendorParam: string;
}

const AFFILIATE_CONFIGS: Record<Vendor, AffiliateConfig> = {
  alza: {
    baseUrl: "https://www.alza.sk",
    refParam: "ref",
    productParam: "product",
    vendorParam: "v"
  },
  mall: {
    baseUrl: "https://www.mall.sk",
    refParam: "ref",
    productParam: "product", 
    vendorParam: "v"
  },
  bonami: {
    baseUrl: "https://www.bonami.sk",
    refParam: "ref",
    productParam: "product",
    vendorParam: "v"
  },
  brasty: {
    baseUrl: "https://www.brasty.sk",
    refParam: "ref",
    productParam: "product",
    vendorParam: "v"
  }
};

/**
 * Generate affiliate URL for a specific vendor and product
 */
export function getAffiliateUrl(vendor: Vendor, productSlug: string): string {
  const config = AFFILIATE_CONFIGS[vendor];
  
  // For now, return the example URL as specified
  return `https://example.com/?ref=meniny365&product=${productSlug}&v=${vendor}`;
  
  // Future implementation would use:
  // const url = new URL(config.baseUrl);
  // url.searchParams.set(config.refParam, "meniny365");
  // url.searchParams.set(config.productParam, productSlug);
  // url.searchParams.set(config.vendorParam, vendor);
  // return url.toString();
}

/**
 * Get vendor display name
 */
export function getVendorName(vendor: Vendor): string {
  const names: Record<Vendor, string> = {
    alza: "Alza.sk",
    mall: "Mall.sk", 
    bonami: "Bonami.sk",
    brasty: "Brasty.sk"
  };
  return names[vendor];
}

/**
 * Get vendor logo URL (placeholder for now)
 */
export function getVendorLogo(vendor: Vendor): string {
  return `/images/vendors/${vendor}.png`;
}
