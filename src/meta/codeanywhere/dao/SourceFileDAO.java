/**
 * @(#)SourceFileDAO.java
 */
package meta.codeanywhere.dao;

import java.util.List;

import meta.codeanywhere.bean.SourceFile;
import meta.codeanywhere.bean.User;

/**
 * @author Biao Zhang
 * @version 11/17/2006
 */
public interface SourceFileDAO extends GenericDAO<SourceFile, Integer> {
	public SourceFile getByFileName(String path);
	public List<SourceFile> getByOwner(User owner);
}
