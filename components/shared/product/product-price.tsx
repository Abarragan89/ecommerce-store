import { cn } from "@/lib/utils";

export default function ProductPrice({ value, className }: { value: number, className?: string }) {
    
    // Ensure two decimal places
    const stringValue = value.toFixed(2)
    const [dollars, cents] = stringValue.split('.');

    return (
        <p className={cn('text-2xl', className)}>
            <span className="text-xs align-super">$</span>
            {dollars}
            <span className="text-xs align-super">{cents}</span>
        </p>
    )
}
