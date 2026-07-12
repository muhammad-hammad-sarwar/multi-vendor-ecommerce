import clsx from "clsx";
interface Props {
  currentStep: number;
}

const steps = ["Shipping", "Payment", "Success"];

export default function CheckoutSteps({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => {
        const active = index + 1 <= currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <span
                className={clsx(
                  "mt-2 w-30 h-10 text-lg flex items-center justify-center rounded-2xl",
                  active
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-green-300/50 border-gray-300 text-green-700",
                )}
              >
                {index + 1}.{step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={clsx(
                  "w-24 md:w-40 h-1 rounded-full",
                  currentStep > index + 1 ? "bg-green-600" : "bg-gray-300",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
