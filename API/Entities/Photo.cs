namespace API.Entities
{
    public class Photo
    {
        public int Id{ get; set; }
        public string Url{ get; set; }
    
        public bool IsMain{ get; set; }
        public string PublicId{ get; set; }
        
        //below attr. added for relation between user and photo table
        public AppUser AppUser{ get; set; }
        public int AppUserId{ get; set; } 
    
    }
}