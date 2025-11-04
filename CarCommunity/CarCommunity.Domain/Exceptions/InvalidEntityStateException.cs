namespace CarCommunity.Domain.Exceptions
{
    public class InvalidEntityStateException : DomainException
    {
        public InvalidEntityStateException(string message) : base(message)
        {
        }

        public InvalidEntityStateException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}