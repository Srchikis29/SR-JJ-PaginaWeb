import { ImageOff } from "lucide-react";
import { useState } from "react";

interface ProductImageProps {
    src?: string;
    alt: string;
    className?: string;
    loading?: "eager" | "lazy";
}

function ProductImage({ src, alt, className = "", loading = "lazy" }: ProductImageProps) {
    const [hasError, setHasError] = useState(!src);

    if (hasError) {
        return (
            <div className={`flex items-center justify-center bg-brand-cream text-brand-cognac ${className}`} role="img" aria-label={`${alt}. Imagen no disponible`}>
                <ImageOff size={24} aria-hidden="true" />
            </div>
        );
    }

    return <img className={className} src={src} alt={alt} loading={loading} onError={() => setHasError(true)} />;
}

export default ProductImage;