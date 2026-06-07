import { getPasswordStrength } from '@/utils/passwordStrength';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2 min-h-5">
      {password && (
        <div className="flex items-center justify-between text-xs text-gray-600">
          <p className={strength.hasNumber ? 'text-green-600' : 'text-red-500'}>
            {strength.hasNumber ? '✓' : '✗'} At least 1 number
          </p>

          <p
            className={
              strength.hasUppercase ? 'text-green-600' : 'text-red-500'
            }
          >
            {strength.hasUppercase ? '✓' : '✗'} At least 1 uppercase letter
          </p>

          <p
            className={
              strength.hasLowercase ? 'text-green-600' : 'text-red-500'
            }
          >
            {strength.hasLowercase ? '✓' : '✗'} At least 1 lowercase letter
          </p>

          <p
            className={
              strength.hasSpecialChar ? 'text-green-600' : 'text-red-500'
            }
          >
            {strength.hasSpecialChar ? '✓' : '✗'} At least 1 special character
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
