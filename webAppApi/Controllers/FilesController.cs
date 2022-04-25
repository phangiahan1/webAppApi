using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAppApi.Data;
using webAppApi.Services.FileService;

namespace webAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        // GET: api/Files
        [EnableCors]
        [HttpGet]
        public IActionResult GetFiles()
        {
            var file = _fileService.GetAllFiles();

            if (file is not null)
            {
                return Ok(file);
            }

            return BadRequest("No records found");
        }

        // GET: api/Files/5
        [EnableCors]
        [HttpGet("{id}")]

        public IActionResult GetFile(string id)
        {
            var file = _fileService.GetFile(id);

            if (file is not null)
            {
                return Ok(file);
            }

            return BadRequest("No records found");
        }

        // PUT: api/Files/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors]
        [HttpPut("{id}")]
        public IActionResult PutFile(string id, File file)
        {
            if (id != file.FileId)
            {
                return BadRequest();
            }
            _fileService.UpdateFile(file);
            return Ok("Updation done");
        }

        // POST: api/Files
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors]
        [HttpPost]
        public IActionResult PostFile(File file)
        {
            _fileService.InsertFile(file);
            return Ok("Data inserted");
        }

        // DELETE: api/Files/5
        [EnableCors]
        [HttpDelete("{id}")]
        public IActionResult DeleteFile(string id)
        {
            _fileService.DeleteFile(id);
            return Ok("Data deleted");
        }
    }
}
