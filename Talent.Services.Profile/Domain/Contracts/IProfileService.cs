using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Talent.Services.Profile.Models;
using Talent.Common.Models;
using Microsoft.AspNetCore.Http;

namespace Talent.Services.Profile.Domain.Contracts
{
    public interface IProfileService
    {
        Task<string> AddLanguage(UserLanguage language); //MOS25072021 added for standard task Module 1
        Task<bool> UpdateLanguage(UserLanguage language); //MOS25072021 added for standard task Module 1
        Task<UserLanguage> GetLanguageByIDAsync(string languageId); //MOS25072021 added for standard task Module 1
        Task DeleteLanguageByIdAsync(string languageId); //MOS25072021 added for standard task Module 1
        bool AddNewLanguage(AddLanguageViewModel language);
        Task<string> AddSkill(UserSkill skill); //MOS25072021 added for standard task Module 1
        Task<bool> UpdateSkill(UserSkill skill); //MOS25072021 added for standard task Module 1
        Task DeleteSkill(string skillId); //MOS25072021 added for standard task Module 1
        Task<string> AddExperience(UserExperience experience); //MOS25072021 added for standard task Module 1
        Task<bool> UpdateExperience(UserExperience experience); //MOS25072021 added for standard task Module 1
        Task DeleteExperience(string experienceId); //MOS25072021 added for standard task Module 1

        Task<TalentProfileViewModel> GetTalentProfile(String Id);
        Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment);
        Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment);
        Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids);

        Task<bool> UpdateTalentProfile(TalentProfileViewModel profile, String updaterId);
        Task<TalentProfileViewModel> UpdateTalentPhoto(string talentId, IFormFile file);

        Task<bool> AddTalentVideo(string talentId, IFormFile file);
        Task<bool> RemoveTalentVideo(string talentId, string videoName);

        Task<EmployerProfileViewModel> GetEmployerProfile(String id, string role);

        Task<bool> UpdateEmployerProfile(EmployerProfileViewModel profile, String updaterId, string role);
        Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file);

        Task<bool> AddEmployerVideo(string employerId, IFormFile file);
        Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents);

        Task<bool> UpdateTalentCV(string talentId, IFormFile file);

        Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList();
        IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList();
        Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model);
        Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId);
        Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model);

        Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId);
        Task<Employer> GetEmployer(string employerId);
    }
}
