import cogoToast from "cogo-toast";

export const PREFIX = "ht";
export const CURRENCY = "Rs ";

export const placeholder = "https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_380x.gif";

export const previewModeNotification = (e) => {
    e.preventDefault();
    cogoToast.warn("On Demo Mode this functionality is disabled!", {
        heading: "Demo Mode",
        hideAfter: 6
    })
}

export const fallbackImage = "/assets/images/fallback-img.png";
export const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.grihadecor.com/api/v1';
export const NEXT_PUBLIC_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: process.env.NEXT_PUBLIC_URL;
export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';
export const NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '';
export const NEXT_PUBLIC_FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "";
export const NEXT_PUBLIC_FACEBOOK_APP_SECRET = process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET ?? "";
export const ESEWA_VERIFY_URL = process.env.ESEWA_VERIFY_URL;
export const ESEWA_MERCHANT_ID = process.env.ESEWA_MERCHANT_ID;
export const KHALTI_PUBLIC_KEY = process.env.KHALTI_PUBLIC_KEY;
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;
export const ACCESS_TOKEN = "__grihaDecorAccessToken";
export const SHIPPING_ID = "__grihaDecorShippingId";
export const ADDRESS_ID = "__grihaDecorAddressId";
export const CHECKOUT_ID = "__grihaDecorCheckoutId";
export const USER_DATA = "__grihaDecorUserData";

export const defaultCenter = {
	lat: 27.708199,
	lng: 85.320382,
};

export const mapOptions = {
	bootstrapURLKeys: {
		key: '',
	},
	containerStyle: {
		width: '100%',
		height: '100%',
	},
	center: {
		lat: 27.708199,
		lng: 85.320382,
	},
	googleMapsApiKey: '',
	id: 'google-map-script',
};