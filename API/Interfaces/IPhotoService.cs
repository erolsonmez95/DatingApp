using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    
        Task<DeletionResult> DeletePhotoAsync (string publicId);
        // each photo uploaded to cloudinary have public Id, we are going to use it to delete.
    }
}